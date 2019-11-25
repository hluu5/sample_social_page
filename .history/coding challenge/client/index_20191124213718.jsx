import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

if (typeof window !== 'undefined'){
  ReactDOM.hydrate(
    <App />,
    document.getElementById('app')
  )
}