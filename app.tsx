import * as compression from 'compression';
import * as express from 'express';
import { join } from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Application from './client/application';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(compression({ level: 6 })); // gzip babey hell ya

// serve up static data & cache it
app.use('/', express.static(join(__dirname, 'public'), { maxAge: 604800 }));

if (process.env.NODE_ENV === 'production') {
  app.use(enforceSSL);
}

// guarantee the appcache manifest always
// serves the right content-type
// sometimes safari is dumb, i think
app.get('/offline.manifest', function (req, res) {
  res.sendFile(join(__dirname, 'public/offline.manifest'), { 'Content-Type': 'text/cache-manifest' });
});

// just render the damn app all the time
app.get('*', function (req, res) {
  res.send(handleRequest(renderToString(<Application />)));
});

app.listen(PORT, function () {
  /* tslint:disable-next-line no-console */
  console.log('Listening on port', PORT);
});

/**
 * express middleware that enforces SSL
 * @param  {Request} req
 * @param  {Response} res
 * @param {function} next
 * @return {undefined}
 */
function enforceSSL(req: express.Request, res: express.Response, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }

  next();
}

/**
 * handles (almost) all express requests
 * @param {String} html
 * @returns {String}
 */
function handleRequest(html) {
  return `<!doctype html>
<html manifest="/offline.manifest">
  <head>
    <title>blacknoise || play awful noises</title>
    <noscript>This site won't work well without Javascript, dude</noscript>
    <link rel="manifest" href="/manifest.json" />
    <link rel="stylesheet" href="/assets/css/main.css" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png" />
    <link rel="mask-icon" href="/assets/img/safari-pinned-tab.svg" color="#313131" />
    <link rel="canonical" href="https://blacknoise.herokuapp.com" />
    <meta name="apple-mobile-web-app-title" content="blacknoise" />
    <meta name="application-name" content="blacknoise" />
    <meta name="theme-color" content="#313131" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content="@ughitsaaron" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://blacknoise.herokuapp.com/" />
    <meta property="og:title" content="blacknoise || play awful noises" />
    <meta property="og:description" content="an offline web app for playing awful noises" />
    <meta property="og:image" content="https://blacknoise.herokuapp.com/assets/img/og-skull.png" />
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
  <script async defer src="/assets/js/bundle.js"></script>
</html>`;
}
