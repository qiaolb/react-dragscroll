/**
 * Created by joe on 16/9/6.
 */
'use strict';

let path = require('path');

console.log(path.join(__dirname, './src'));

module.exports = {
  entry: {
    DragScroll: './src/DragScroll.jsx'
  },
  output: {
    path: 'lib',
    filename: '[name].js',
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, './src')]
      }
    ]
  },
  externals: {
    'react': 'react',
    'lodash': 'lodash'
  }
};
