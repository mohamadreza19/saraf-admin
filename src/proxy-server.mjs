import { app as serverEn } from './server/en/server.mjs';
import { app as serverFa } from './server/fa/server.mjs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const express = require('express');

function run() {
  const port = process.env.PORT || 4000;
  const server = express();

  server.use('/fa', serverFa());
  server.use('/en', serverEn());
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// Ensure the server runs only when executed directly, not when imported as a module.
const moduleFilename = fileURLToPath(import.meta.url);
const moduleDirname = dirname(moduleFilename);

if (process.argv[1] === moduleFilename || moduleDirname.includes('iisnode')) {
  run();
}
