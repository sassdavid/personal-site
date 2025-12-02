import React from 'react';
import Degree from '@/components/resume/education/Degree';
import { DegreeProps } from '@/lib/types';

const Education = ({ data = [] }: { data: DegreeProps[] }) => (
  <div className="education">
    <div className="link-to" id="education" />
    <div className="title">
      <h3>Education</h3>
    </div>
    {data.map((degree) => (
      <Degree
        key={degree.school}
        degree={degree.degree}
        school={degree.school}
        year={degree.year}
        link={degree.link}
        thesis={degree.thesis}
      />
    ))}
  </div>
);

export default Education;
