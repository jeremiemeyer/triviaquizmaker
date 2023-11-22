import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QuizDataProvider } from './context/QuizDataProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QuizDataProvider>
        <App />
      </QuizDataProvider>
  </React.StrictMode>
);
