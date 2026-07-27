import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import profile from '@/data/profile.json';
import Hero from '../../Template/Hero';

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);

    const heroSection = document.querySelector('.hero');
    expect(heroSection).toBeInTheDocument();
  });

  it('displays the name as heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(profile.name);
  });

  // The tagline reads its role and focus from the shared profile, so this
  // asserts they agree rather than restating the sentence — restating it just
  // means editing the copy in two places.
  it('describes the current work from the shared profile', () => {
    const { container } = render(<Hero />);

    const tagline = container.querySelector('.hero-tagline');
    expect(tagline).toHaveTextContent(profile.role);
    expect(tagline).toHaveTextContent(profile.focus);

    const employerLink = screen.getByRole('link', { name: /loxon/i });
    expect(employerLink).toHaveAttribute('href', 'https://loxon.eu');
    expect(employerLink).toHaveClass('hero-highlight');
    expect(employerLink).toHaveAttribute('rel', 'nofollow noopener noreferrer');
  });

  it('keeps personal stats off the homepage', () => {
    const { container } = render(<Hero />);

    // Telemetry belongs on /stats. It was on the homepage once, where a
    // ticking age readout sat above the introduction.
    expect(container.querySelector('.telemetry')).not.toBeInTheDocument();
    expect(screen.queryByText('Countries visited')).not.toBeInTheDocument();
    expect(screen.queryByText('Computing since')).not.toBeInTheDocument();
    expect(screen.queryByText('Based in')).not.toBeInTheDocument();
  });

  it('renders one primary CTA and one quieter resume link', () => {
    render(<Hero />);

    const aboutButton = screen.getByRole('link', { name: /about me/i });
    expect(aboutButton).toHaveAttribute('href', '/about');
    expect(aboutButton).toHaveClass('button');

    const resumeButton = screen.getByRole('link', { name: /view resume/i });
    expect(resumeButton).toHaveAttribute('href', '/resume');
    expect(resumeButton).toHaveClass('hero-resume-link');
    expect(resumeButton).not.toHaveClass('button');
  });

  it('has decorative background elements', () => {
    render(<Hero />);

    const bg = document.querySelector('.hero-bg');
    expect(bg).toBeInTheDocument();
    expect(bg).toHaveAttribute('aria-hidden', 'true');
  });
});
