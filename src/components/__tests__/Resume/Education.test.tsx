import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Education from '../../Resume/Education';
import Degree from '../../Resume/Education/Degree';

const mockDegrees = [
  {
    school: 'Széchenyi István Egyetem',
    degree: 'Computer Science Engineer',
    link: 'https://admissions.sze.hu/welcome',
    year: 2019,
    thesis: 'Demonstration software for presenting the B&B method',
  },
  {
    school:
      'Wigner Jenő Műszaki, Informatikai Technikum, Szakképző Iskola, Gimnázium és Kollégium',
    degree: 'High-school graduation',
    link: 'https://wignerkozepiskola.hu',
    year: 2012,
  },
];

describe('Education', () => {
  it('renders the education section with title', () => {
    render(<Education data={mockDegrees} />);

    expect(
      screen.getByRole('heading', { name: /education/i }),
    ).toBeInTheDocument();
  });

  it('renders all degrees', () => {
    render(<Education data={mockDegrees} />);

    expect(screen.getByText('Computer Science Engineer')).toBeInTheDocument();
    expect(screen.getByText('High-school graduation')).toBeInTheDocument();
  });

  it('renders school links', () => {
    render(<Education data={mockDegrees} />);

    const szeLink = screen.getByRole('link', {
      name: /Széchenyi István Egyetem/i,
    });
    expect(szeLink).toHaveAttribute(
      'href',
      'https://admissions.sze.hu/welcome',
    );

    const wignerLink = screen.getByRole('link', { name: /Wigner Jenő/i });
    expect(wignerLink).toHaveAttribute('href', 'https://wignerkozepiskola.hu');
  });

  it('has anchor link for navigation', () => {
    render(<Education data={mockDegrees} />);

    const anchor = document.getElementById('education');
    expect(anchor).toBeInTheDocument();
  });
});

describe('Degree', () => {
  const mockDegree = {
    school: 'Széchenyi István Egyetem',
    degree: 'Computer Science Engineer',
    link: 'https://admissions.sze.hu/welcome',
    year: 2019,
  };

  it('renders degree title', () => {
    render(<Degree data={mockDegree} />);

    expect(screen.getByText('Computer Science Engineer')).toBeInTheDocument();
  });

  it('renders school name with link', () => {
    render(<Degree data={mockDegree} />);

    const link = screen.getByRole('link', {
      name: /Széchenyi István Egyetem/i,
    });
    expect(link).toHaveAttribute('href', 'https://admissions.sze.hu/welcome');
  });

  it('displays year', () => {
    render(<Degree data={mockDegree} />);

    expect(screen.getByText(/2019/)).toBeInTheDocument();
  });

  it('renders as article element', () => {
    render(<Degree data={mockDegree} />);

    const article = document.querySelector('article.degree-container');
    expect(article).toBeInTheDocument();
  });
});
