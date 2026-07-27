import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Footer from '../../Template/Footer';

describe('Footer', () => {
  it('renders the footer with correct structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('displays the name and role', () => {
    render(<Footer />);

    expect(screen.getByText('David Sass-Kovacs')).toBeInTheDocument();
    expect(screen.getByText(/Senior DevOps Engineer/)).toBeInTheDocument();
  });

  it('displays the current year in copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${currentYear}`)),
    ).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute(
      'href',
      '/resume',
    );
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  // The footer renders every non-index route, so unlike the nav it has no
  // `primary` filter to hide behind — it is the surface a disabled route
  // would otherwise still leak through.
  it('omits routes disabled for lack of content', () => {
    render(<Footer />);

    expect(
      screen.queryByRole('link', { name: /archive/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /writing/i }),
    ).not.toBeInTheDocument();
  });

  it('renders contact icons section', () => {
    render(<Footer />);

    // Contact icons are rendered via ContactIcons component
    const socialSection = document.querySelector('.footer-social');
    expect(socialSection).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('has link to home from avatar', () => {
    render(<Footer />);

    const avatarLink = document.querySelector('.footer-avatar');
    expect(avatarLink).toHaveAttribute('href', '/');
  });
});
