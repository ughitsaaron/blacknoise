import React from 'react';
import { render } from 'react-dom';
import Application from './application';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  });
}

render(<Application />, document.getElementById('root'));
