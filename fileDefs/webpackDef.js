module.exports = (listOfPages) => {
  return `const path = require('path');
const webpack = require('webpack');
require('@babel/polyfill');
const pages = [${listOfPages}];

module.exports = pages.map((page) => {
  return {
      mode: 'development',
      entry: ['@babel/polyfill', './src/bundles/'+page+'Bundle.js'],
      module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use: {
                      loader: 'babel-loader'
                  }
              }
          ]
      },
      output: {
          filename: 'js/'+page+'.bundle.min.js',
          path: path.join(__dirname, 'dist')
      },
      plugins: [
          new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
          })
      ],
      node: {
         fs: "empty",
         net: "empty"
      }
  }
});`;
}
