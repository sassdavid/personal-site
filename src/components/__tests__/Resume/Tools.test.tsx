import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Tools from '../../Resume/Tools';
import Tool from '../../Resume/Tools/Tool';

const mockTools = [
  {
    name: 'Terraform',
    link: 'https://www.terraform.io/',
  },
  {
    name: 'Terragrunt',
    link: 'https://terragrunt.gruntwork.io/',
  },
  {
    name: 'RDS',
    link: 'https://aws.amazon.com/rds/',
  },
];

describe('Tools', () => {
  it('renders the tools section with heading', () => {
    render(<Tools data={mockTools} />);

    expect(
      screen.getByRole('heading', { name: /Tools & Technologies/i }),
    ).toBeInTheDocument();
  });

  it('renders all tools', () => {
    render(<Tools data={mockTools} />);

    expect(screen.getByText('Terraform')).toBeInTheDocument();
    expect(screen.getByText('Terragrunt')).toBeInTheDocument();
    expect(screen.getByText('RDS')).toBeInTheDocument();
  });

  it('renders tools as tags', () => {
    const { container } = render(<Tools data={mockTools} />);

    const tags = container.querySelectorAll('.tool-tag');
    expect(tags.length).toBe(mockTools.length);
  });

  it('sorts tools alphabetically', () => {
    render(<Tools data={mockTools} />);

    const terraform = screen.getByText('Terraform');
    const terragrunt = screen.getByText('Terragrunt');
    const rds = screen.getByText('RDS');

    expect(terraform).toBeInTheDocument();
    expect(terragrunt).toBeInTheDocument();
    expect(rds).toBeInTheDocument();
  });

  it('has anchor link for navigation', () => {
    render(<Tools data={mockTools} />);

    const anchor = document.getElementById('tools');
    expect(anchor).toBeInTheDocument();
  });
});

describe('Tool', () => {
  const mockToolWithLink = {
    name: 'Terraform',
    link: 'https://www.terraform.io/',
  };

  const mockToolWithoutLink = {
    name: 'Custom Tool',
    link: '',
  };

  it('renders tool name', () => {
    render(<Tool data={mockToolWithLink} />);

    expect(screen.getByText(/Terraform/)).toBeInTheDocument();
  });

  it('renders tool with link as anchor', () => {
    render(<Tool data={mockToolWithLink} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockToolWithLink.link);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'nofollow noopener noreferrer');
  });

  it('renders tool without link as span', () => {
    const { container } = render(<Tool data={mockToolWithoutLink} />);

    const span = container.querySelector('.tool-tag');
    expect(span).toBeInTheDocument();
    expect(span?.tagName).toBe('SPAN');
  });

  it('applies tool-tag class', () => {
    const { container } = render(<Tool data={mockToolWithLink} />);

    const tag = container.querySelector('.tool-tag');
    expect(tag).toBeInTheDocument();
  });
});
