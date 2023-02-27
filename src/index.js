import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const StrictApp = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<StrictApp />);
