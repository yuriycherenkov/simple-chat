const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const babelPlugins = [
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
];

module.exports = (env) => {
  const reactHotLoaderPlugin = 'react-hot-loader/babel';

  const config = {
    entry: {
      main: './src/index.js',
    },
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              plugins: env === 'development' ? [...babelPlugins, reactHotLoaderPlugin] : [...babelPlugins],
              presets: [
                ['@babel/env', {
                  modules: false,
                }], '@babel/react'],
            },
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: 'public/index.html',
        filename: './index.html',
      }),
    ],
  };

  return config;
};
