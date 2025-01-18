import React from 'react';
import Job from '@/components/resume/experience/Job';
import { JobProps } from '@/lib/types';

const Experience = ({ data = [] }: { data: JobProps[] }) => (
  <div className="experience">
    <div className="link-to" id="experience" />
    <div className="title">
      <h3>Experience</h3>
    </div>
    {data.map(job => (
      <Job
        key={`${job.name}-${job.position}`}
        name={job.name}
        position={job.position}
        startDate={job.startDate}
        url={job.url}
        endDate={job.endDate}
        summary={job.summary}
        highlights={job.highlights}
      />
    ))}
  </div>
);

export default Experience;
