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
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        // All files with a '.ts' or '.tsx'
        // extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
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
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
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
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
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
        './index.ts',
      ],
    },
    output: {
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // Enable HMR
    ],
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
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
