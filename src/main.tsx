import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Perform accessibility audit in development mode
if (import.meta.env.DEV) {
  Promise.all([
    import('react'),
    import('react-dom'),
    import('@axe-core/react')
  ]).then(([React, ReactDOM, axe]) => {
    axe.default(React.default || React, ReactDOM.default || ReactDOM, 1000);
  }).catch(err => {
    console.warn('Failed to load @axe-core/react for accessibility auditing:', err);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
