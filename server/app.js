import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import createError from 'http-errors';
import fs from 'fs';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import webpackConfig from '../webpack.config';

import usersRouter from './routes/users';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

let webpackDevMiddlewareInstance;
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig(process.env.NODE_ENV));

  webpackDevMiddlewareInstance = webpackDevMiddleware(compiler);

  app.use(webpackDevMiddlewareInstance);

  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      return res.send(result);
    });
  });
} else {
  const indexTemplate = fs.readFileSync(path.resolve(
    __dirname,
    '..',
    'dist',
    'index.html',
  )).toString();
  app.use('*', (req, res) => {
    res.set('content-type', 'text/html');
    res.send(indexTemplate);
  });
}


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
