import Link from 'next/link';

import ThemePortrait from './ThemePortrait';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-avatar">
          <ThemePortrait width={160} height={160} priority />
        </div>

        <h1 className="hero-title">
          <span className="hero-name">David Sass-Kovacs</span>
        </h1>

        <p className="hero-tagline">
          Senior DevOps Engineer, specializing in cloud infrastructure and
          automation. Currently at{' '}
          <a
            href="https://loxon.eu"
            className="hero-highlight"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Loxon
          </a>
          , building scalable solutions with Kubernetes, AWS.
        </p>

        <div className="hero-chips">
          <span className="hero-chip">DevOps</span>
          <span className="hero-chip">Engineer</span>
          <span className="hero-chip">AWS</span>
        </div>

        <div className="hero-cta">
          <Link href="/about" className="button button-primary">
            About Me
          </Link>
          <Link href="/resume" className="button button-secondary">
            View Resume
          </Link>
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true">
        <div className="hero-gradient" />
      </div>
    </section>
  );
}
