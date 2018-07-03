const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const merge = require('webpack-merge');

const babelPlugins = [
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
];

module.exports = (env) => {
  const reactHotLoaderPlugin = 'react-hot-loader/babel';
  const isDevelopment = env === 'development';

  const commonConfig = {
    context: path.resolve(__dirname, 'src'),
    output: {
      filename: '[name]-[hash:8].js',
      chunkFilename: '[name]-[hash:8].js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      jsonpFunction: 'wpj',
    },
    resolve: {
      extensions: ['.jsx', '.json', '.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        // { test: /manifest\.json$/, use: ['file-loader'] },
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              plugins: isDevelopment ? [...babelPlugins, reactHotLoaderPlugin] : [...babelPlugins],
              presets: [
                ['@babel/env', {
                  modules: false,
                  targets: {
                    browsers: ['chrome >= 62'],
                  },
                }], '@babel/react', '@babel/flow'],
            },
          },
          exclude: /node_modules/,
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
        template: path.join(__dirname, 'public/index.html'),
        filename: './index.html',
      }),
      new DynamicCdnWebpackPlugin(),
    ],
  };

  const configDevelopment = merge.smart(commonConfig, {
    mode: 'development',
    entry: {
      app: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        './index.js',
      ],
    },
    output: {
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // Enable HMR
    ],
    devtool: 'cheap-module-source-map',
  });

  const configProduction = merge.smart(commonConfig, {
    mode: 'production',
    entry: './index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],
  });

  const config = isDevelopment ? configDevelopment : configProduction;

  return config;
};
