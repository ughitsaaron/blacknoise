import Application from './application';
import React from 'react';
import { render } from 'react-dom';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  });
}

render(<Application />, document.getElementById('root'));
