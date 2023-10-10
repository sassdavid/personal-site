import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const { REACT_APP_ENVIRONMENT, REACT_APP_GA_MEASUREMENT_ID } = process.env;

if (REACT_APP_ENVIRONMENT === 'production') {
  ReactGA.initialize([
    { trackingId: REACT_APP_GA_MEASUREMENT_ID },
  ]);
}

const Analytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (REACT_APP_ENVIRONMENT === 'production') {
      ReactGA.send({ hitType: 'pageview', page: pathname });
    }
  });

  return null;
};

export default Analytics;
