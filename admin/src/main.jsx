import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render( // Use createRoot from react-dom/client
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
