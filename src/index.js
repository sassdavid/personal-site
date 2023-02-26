import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';

const StrictApp = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const container = document.getElementById('root');
let root = createRoot(container);

if (container.hasChildNodes()) {
  root = hydrateRoot(container, <StrictApp />);
} else {
  root.render(<StrictApp />);
}
