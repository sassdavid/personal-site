import React from 'react';
import { DegreeProps } from '@/lib/types';

const Degree = ({ degree, link, school, year, thesis }: DegreeProps) => (
  <article className="degree-container">
    <header>
      <h4 className="degree">{degree}</h4>
      <h4 className="thesis">{thesis}</h4>
      <p className="school">
        <a href={link} target="_blank" rel="nofollow noopener noreferrer">
          {school}
        </a>
        , {year}
      </p>
    </header>
  </article>
);

export default Degree;
