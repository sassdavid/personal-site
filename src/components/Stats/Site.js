import React, { useCallback, useEffect, useState } from 'react';

import Table from './Table';
import initialData from '../../data/stats/site';

const Stats = () => {
  const [data, setResponseData] = useState(initialData);
  // TODO think about persisting this somewhere
  const fetchData = useCallback(async () => {
    // request must be authenticated if private
    const res = await fetch(
      'https://api.github.com/repos/sassdavid/personal-site',
      {
        headers: {
          Authorization: 'Bearer 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',
        },
      },
    );
    const resData = await res.json();
    setResponseData(
      initialData.map((field) => ({
        ...field,
        // update value if value was returned by call to github
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
      <h3>Some stats about me and this site</h3>
      <Table data={data} />
    </div>
  );
};

export default Stats;
