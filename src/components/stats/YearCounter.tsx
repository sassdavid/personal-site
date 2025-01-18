'use client';

import React, { useEffect, useState } from 'react';

const YearCounter = ({ fromDateString }: { fromDateString: string }) => {
  const [year, setYear] = useState<string | undefined>();

  const tick = () => {
    const divisor = 1000 * 60 * 60 * 24 * 365.2421897; // ms in an average year
    const fromDate = new Date(fromDateString);
    setYear(((Date.now() - fromDate.getTime()) / divisor).toFixed(11));
  };

  useEffect(() => {
    const timer = setInterval(() => tick(), 25);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>{year}</>;
};

export default YearCounter;
