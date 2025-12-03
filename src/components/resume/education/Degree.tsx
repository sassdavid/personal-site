import React from 'react';

import type { Degree as DegreeType } from '@/data/resume/degrees';

interface DegreeProps {
  data: DegreeType;
}

const Degree: React.FC<DegreeProps> = ({ data }) => (
  <article className="degree-container">
    <header>
      <h4 className="degree">{data.degree}</h4>
      <h4 className="thesis">{data.thesis}</h4>
      <p className="school">
        <a href={data.link} target="_blank" rel="nofollow noopener noreferrer">
          {data.school}
        </a>
        , {data.year}
      </p>
    </header>
  </article>
);

export default Degree;
