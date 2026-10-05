import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';

interface Step {
  uses?: string;
  run?: string;
  env?: Record<string, string>;
  with?: Record<string, unknown>;
}

interface Job {
  permissions?: Record<string, string> | string;
  env?: Record<string, string>;
  steps?: Step[];
}

interface Workflow {
  on?: Record<string, unknown> | string | string[];
  permissions?: Record<string, string> | string;
  env?: Record<string, string>;
  jobs: Record<string, Job>;
}

const directory = join(process.cwd(), '.github/workflows');
const workflows = readdirSync(directory)
  .filter((name) => /\.ya?ml$/.test(name))
  .map((name) => {
    const yaml = readFileSync(join(directory, name), 'utf8');
    // Reuse the YAML parser already used for post frontmatter.
    const workflow = matter(`---\n${yaml}\n---`).data as Workflow;
    return { name, workflow };
  });

// Fork: the Dependabot auto-approve/auto-merge workflows run on
// pull_request_target with secrets.PAT_TOKEN. That is safe only while no job
// checks out the PR's code, so secrets are judged per job by whether it does.
const triggers = (workflow: Workflow) =>
  typeof workflow.on === 'string'
    ? [workflow.on]
    : Array.isArray(workflow.on)
      ? workflow.on
      : Object.keys(workflow.on ?? {});

const checksOut = (job: Job) =>
  (job.steps ?? []).some((step) => step.uses?.startsWith('actions/checkout@'));

it('finds the workflows it is meant to check', () => {
  expect(workflows.map(({ name }) => name)).toContain('node.js.yml');
});

describe.each(workflows)('$name credential boundaries', ({ workflow }) => {
  it('pins every external action to a full commit SHA', () => {
    for (const job of Object.values(workflow.jobs)) {
      for (const step of job.steps ?? []) {
        if (step.uses) {
          expect(step.uses).toMatch(/^[\w./-]+@[a-f0-9]{40}$/);
        }
      }
    }
  });

  it('removes checkout authentication before repository code executes', () => {
    for (const job of Object.values(workflow.jobs)) {
      for (const step of job.steps ?? []) {
        if (step.uses?.startsWith('actions/checkout@')) {
          expect(step.with?.['persist-credentials']).toBe(false);
        }
      }
    }
  });

  // Fork: CI sets up Node with mise-action, whose github_token input defaults
  // to the job token and is exported as MISE_GITHUB_TOKEN to every later step
  // — npm install scripts and the build included. Only an explicit empty
  // value suppresses that export.
  it('keeps mise-action from exporting the job token', () => {
    for (const job of Object.values(workflow.jobs)) {
      for (const step of job.steps ?? []) {
        if (step.uses?.startsWith('jdx/mise-action@')) {
          expect(step.with?.github_token).toBe('');
        }
      }
    }
  });

  it('never checks out code in a pull_request_target workflow', () => {
    if (!triggers(workflow).includes('pull_request_target')) return;
    for (const job of Object.values(workflow.jobs)) {
      expect(checksOut(job)).toBe(false);
    }
  });

  it('keeps write permissions confined to deployment without repository code', () => {
    expect(workflow.permissions).toEqual({ contents: 'read' });
    for (const [id, job] of Object.entries(workflow.jobs)) {
      const permissions = job.permissions ?? workflow.permissions;
      expect(typeof permissions).toBe('object');
      if (id === 'deploy') {
        // Privileged deployment consumes the validated artifact; it must not
        // check out the repository or execute its scripts/dependencies.
        for (const step of job.steps ?? []) {
          expect(step.run).toBeUndefined();
          expect(step.uses).toMatch(
            /^actions\/(?:download-artifact|upload-pages-artifact|deploy-pages)@/,
          );
        }
      } else {
        expect(Object.values(permissions ?? {})).not.toContain('write');
        if (!checksOut(job)) continue;
        expect(JSON.stringify([workflow.env, job.env, job.steps])).not.toMatch(
          /\$\{\{\s*(?:secrets[.\[]|github\.token)/,
        );
      }
    }
  });

  it('configures the existing Pages site without enabling or changing it', () => {
    // Fork: only node.js.yml builds and deploys the site.
    const build = workflow.jobs.build;
    if (!workflow.jobs.deploy) return;
    expect(build.permissions).toEqual({ contents: 'read', pages: 'read' });
    const configure = build.steps?.find((step) =>
      step.uses?.startsWith('actions/configure-pages@'),
    );
    expect(configure?.with).toMatchObject({
      static_site_generator: 'next',
      enablement: false,
    });
  });
});
