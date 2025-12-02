import dayjs from 'dayjs';
import React from 'react';
import { JobProps } from '@/lib/types';

const Job = ({
  name,
  position,
  url,
  startDate,
  endDate,
  summary,
  highlights,
}: JobProps) => (
  <article className="jobs-container">
    <header>
      <h4>
        <a href={url} target="_blank" rel="nofollow noopener noreferrer">
          {name}
        </a>{' '}
        - {position}
      </h4>
      <p className="daterange">
        {' '}
        {dayjs(startDate).format('MMMM YYYY')} -{' '}
        {endDate ? dayjs(endDate).format('MMMM YYYY') : 'PRESENT'}
      </p>
    </header>
    {summary ? <div className="summary">{summary}</div> : null}
    {highlights ? (
      <ul className="points">
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    ) : null}
  </article>
);

export default Job;
