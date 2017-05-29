import * as React from 'react';
import { render } from 'react-dom';
import Application from './application';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

render(<Application />, document.getElementById('root'));
