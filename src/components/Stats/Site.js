import React, { useCallback, useEffect, useState } from 'react';

import Table from './Table';
import initialData from '../../data/stats/site';

const Stats = () => {
  const [data, setResponseData] = useState(initialData);
  const fetchData = useCallback(async () => {
    const res = await fetch(
      'https://api.github.com/repos/sassdavid/personal-site',
    );
    const resData = await res.json();
    setResponseData(
      initialData.map((field) => ({
        ...field,
        value: Object.keys(resData).includes(field.key)
          ? resData[field.key]
          : field.value,
      })),
    );
  }, []);

  useEffect(() => {
    fetchData().then();
  }, [fetchData]);

  return (
    <div>
      <h3>Some stats about this site</h3>
      <Table data={data} />
    </div>
  );
};

export default Stats;
