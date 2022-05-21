// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // This tells Webpack to look for App.js in the exact same folder

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);