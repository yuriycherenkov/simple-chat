#!/usr/bin/env node
/**
 * Module dependencies.
 */
/* eslint-disable no-use-before-define, no-restricted-globals, no-console */
import sticky from 'sticky-session';
import { sequelize } from './models';
import config from './config';
import app from './app';

const debug = require('debug')('myapp:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

const isDevelopment = process.env.NODE_ENV === 'development';

sequelize.sync({ force: false, alter: false })
  .then(() => {
    if (isDevelopment) {
      server.listen(port);
      server.on('error', onError);
      server.on('listening', onListening);
      return;
    }

    if (!sticky.listen(app, config.api.port)) {
      app.once('listening', () => {
        console.log('Cluster started on 3000 port');
      });
    } else {
      console.log('Started worker');
    }
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const intPort = parseInt(val, 10);

  if (isNaN(intPort)) {
    // named pipe
    return val;
  }

  if (intPort >= 0) {
    // intPort number
    return intPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

/* eslint-enable no-use-before-define, no-restricted-globals, no-console */
