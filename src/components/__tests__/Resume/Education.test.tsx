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
  it('opens with the shared section heading, in sentence case', () => {
    render(<Education data={mockDegrees} />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Education',
    });
    expect(heading).toHaveClass('section-heading');
    expect(heading.parentElement).toHaveClass('section-header');
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

  // The `#education` anchor now lives on the page's <section> wrapper rather
  // than a marker div inside this component, so it is asserted in
  // `app/__tests__/resume-anchors.test.tsx` instead.
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

  it('sets the school and the year on one line under the degree', () => {
    render(<Degree data={mockDegree} />);

    const line = document.querySelector('.degree + .school') as HTMLElement;

    expect(line.textContent).toBe('Széchenyi István Egyetem, 2019');
    expect(line.querySelector('time')).toHaveAttribute('datetime', '2019');
  });

  it('sets typographic quotes in the degree and the school', () => {
    render(
      <Degree
        data={{
          ...mockDegree,
          degree: "Master's in Computer Science",
          school: "Queen's University",
        }}
      />,
    );

    expect(document.querySelector('.degree')?.textContent).toBe(
      'Master’s in Computer Science',
    );
    expect(document.querySelector('.school a')?.textContent).toBe(
      'Queen’s University',
    );
  });

  it('renders as article element', () => {
    render(<Degree data={mockDegree} />);

    const article = document.querySelector('article.degree-container');
    expect(article).toBeInTheDocument();
  });
});
