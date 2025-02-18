import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import AppServerModule from './src/main.server';
import { REQUEST_TOKEN, RESPONSE_TOKEN } from 'src/app/core/tokens';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';

import * as dotenv from 'dotenv';
dotenv.config();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();

  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? join(distFolder, 'index.original.html')
    : join(distFolder, 'index.html');

  const commonEngine = new CommonEngine();
  server.use(cookieParser());
  server.set('view engine', 'html');
  server.set('views', distFolder);
  server.set('trust proxy', true);
  server.get('*.*', express.static(distFolder));
  // Proxy setup - only allow POST and PATCH methods

  if (!process.env['API_URL']) {
    throw Error('API_URL not Found');
  }
  const apiProxy = createProxyMiddleware({
    target: process.env['API_URL'], // The backend URL you want to proxy to
    changeOrigin: true, // For cross-origin requests
    pathRewrite: { '^/api': '' },

    logger: console,
  });
  server.get('/_ip', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.json({ ip: userIp });
  });
  server.use('/api', apiProxy);
  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: distFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: REQUEST_TOKEN, useValue: req },
          { provide: RESPONSE_TOKEN, useValue: res },
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export default AppServerModule;
