/**
 * Created by hobl on 31.05.17.
 */

import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import prod from './webpackConfig/prod';

const npmCommand = process.env.npm_lifecycle_event;

const SRC_DIR = path.resolve(__dirname, 'src'),
  DIST_DIR = path.resolve(__dirname, 'dist');

const copy = new CopyWebpackPlugin (
  [
    {
      from: SRC_DIR + '/stylesheets',
      to: DIST_DIR + '/stylesheets/'
    },
    {
      from: SRC_DIR + '/index.html',
      to: DIST_DIR
    }
  ]
);

const clean = new CleanWebpackPlugin (DIST_DIR);

const config = {
  entry: SRC_DIR + '/app.js',
  devtool: 'source-map',
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs?/,
        include: SRC_DIR + '/templates/',
        exclude: /node_modules/,
        loader: 'handlebars-loader'
      }
    ]
  },
  plugins: [
    clean,
    copy
  ],
  output: {
    filename: 'app.js',
    path: DIST_DIR + '/'
  }
}

if(npmCommand == 'start') {
  module.exports = config;
}
else if(npmCommand == 'build')  {
  module.exports = merge(config, prod);
}

