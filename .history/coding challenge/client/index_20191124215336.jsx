import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

// if (typeof window !== 'undefined'){
function runApplication(data, node) {
  ReactDOM.hydrate(
    <App />,
    document.getElementById('app')
  )
}
// }

window.runReactApplication = runApplication;