const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
  bail: true,
  devtool: false,
  mode: 'development',
  entry: {
    background: path.join(paths.appSrc, 'background.js'),
    injected: path.join(paths.appSrc, 'injected.js'),
    contentscript: path.join(paths.appSrc, 'contentscript.js'),
  },
  output: {
    path: paths.appBuild,
    filename: '[name].bundle.js',
  },
  resolve: {
    modules: ['node_modules', paths.appDirectory],
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
};
