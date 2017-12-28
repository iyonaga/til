// require('babel-polyfill');
var path                       = require('path');
var ExtractTextPlugin          = require('extract-text-webpack-plugin');
var autoprefixer               = require('autoprefixer');
var webpack                    = require('webpack');
var debug = true;


module.exports = [{
  entry: {
    style: `./src/css/style.css`,
  },

  devtool: (debug)? 'inline-source-map': false,

  output: {
    path: path.join(__dirname, `./public/css`),
    filename: '[name].css'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                importLoaders: 1,
                url: false,
                sourceMap: (debug)? true: false
              }
            },
            'postcss-loader'
          ]
        })
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ]
}];
