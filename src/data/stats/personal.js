import React, { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const YearCounter = ({ fromDateString }) => {
  const [year, setYear] = useState();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24 * 365.2421897; // ms in an average year
    const fromDate = new Date(fromDateString);
    setYear(((Date.now() - fromDate) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <>{year}</>;
};

const data = [
  {
    key: 'age',
    label: 'Current age',
    value: <YearCounter fromDateString="1993-06-16T09:30:00" />,
  },
  {
    key: 'currentjob',
    label: 'Years in my current job',
    value: <YearCounter fromDateString="2017-06-06T08:00:00" />,
    link: 'https://www.loxon.eu/',
  },
  {
    key: 'coffe',
    label: 'Average cups of coffee per day',
    value: 4,
  },
  {
    key: 'countries',
    label: 'Countries visited',
    value: 10,
  },
  {
    key: 'location',
    label: 'Current location',
    value: 'Budapest, HU',
  },
];

export default data;
