import { render, screen } from '@testing-library/react';
import ContactIcons from '../contact/ContactIcons';

describe('ContactIcons', () => {
  it('renders contact icons', () => {
    render(<ContactIcons />);

    // Check that the component renders
    const icons = screen.getByRole('list');
    expect(icons).toBeInTheDocument();
  });

  it('renders all contact links', () => {
    render(<ContactIcons />);

    // Check that links are present
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('has accessible labels', () => {
    render(<ContactIcons />);

    // Check for aria-labels
    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href');
  });

  it('opens links in new tab with security attributes', () => {
    render(<ContactIcons />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'nofollow noopener noreferrer');
    });
  });
});
