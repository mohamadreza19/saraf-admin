import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';
import { REQUEST_TOKEN, RESPONSE_TOKEN } from 'src/app/core/tokens';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';

import * as dotenv from 'dotenv';
import { LOCALE_ID } from '@angular/core';
import { fileURLToPath } from 'node:url';

import cors from 'cors'; // Import cors middleware
dotenv.config();

const apiProxy = createProxyMiddleware({
  target: process.env['API_URL'], // The backend URL you want to proxy to
  changeOrigin: true, // For cross-origin requests
  pathRewrite: { '^/api': '' },

  logger: console,
});

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));

  server.use(cookieParser());
  // server.use(cors()); // Enable CORS for all routes
  server.set('trust proxy', true);
  /**
   * Get the language from the corresponding folder
   */
  const lang = basename(serverDistFolder);
  /**
   * Set the route for static content and APP_BASE_HREF
   */
  const langPath = `/${lang}/`;
  /**
   * Note that the 'browser' folder is located two directories above 'server/{lang}/'
   */
  const browserDistFolder = resolve(serverDistFolder, `../../browser/${lang}`);
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  // Complete the route for static content by concatenating the language.
  server.get('/_ip', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.json({ ip: userIp });
  });

  server.get(
    '*.*',
    express.static(browserDistFolder, {
      maxAge: '1y',
    }),
  );
  server.use('/api', apiProxy);
  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    /**
     * Discard baseUrl as we will provide it with langPath
     */
    const { protocol, originalUrl, headers } = req;
    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: resolve(serverDistFolder, `../../browser/`), // publicPath does not need to concatenate the language.
        providers: [
          { provide: APP_BASE_HREF, useValue: langPath },
          { provide: LOCALE_ID, useValue: lang },
          { provide: RESPONSE_TOKEN, useValue: res },
          { provide: REQUEST_TOKEN, useValue: req },
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}
