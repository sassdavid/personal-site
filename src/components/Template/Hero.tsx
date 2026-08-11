import Link from 'next/link';

import profile from '@/data/profile.json';

import ThemePortrait from './ThemePortrait';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
          </h1>

          {/* Role and focus come from the shared profile so this cannot drift
              from the metadata, schema and resume that read the same file. */}
          <p className="hero-tagline">
            {profile.role}, specializing in {profile.focus}. Currently at{' '}
            <a
              href="https://loxon.eu"
              className="hero-highlight"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Loxon
            </a>
            , building and running platforms on AWS and Kubernetes.
          </p>

          <div className="hero-cta">
            <Link href="/about" className="button">
              About Me
            </Link>
            <Link href="/resume" className="hero-resume-link">
              View Resume
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-portrait">
          <ThemePortrait width={320} height={320} priority />
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true" />
    </section>
  );
}
