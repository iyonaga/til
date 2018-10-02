const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProduction =
  process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/js/app.js']
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: './assets/js/[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },

      {
        test: /\.vue$/,
        use: ['vue-loader']
      },

      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-templates-loader',
            options: {
              delimiter: '$',
              minify: isProduction,
              minifyOptions: {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                minifyJS: true
              }
            }
          }
        ]
      },

      {
        test: /\.s?css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        include: [path.resolve(__dirname, 'src', 'img')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[hash].[ext]',
              outputPath: 'assets/img/',
              publicPath: '/assets/img/'
            }
          }
        ]
      },

      {
        test: /\.(woff|woff2|eot|otf|ttf|svg)$/,
        include: [
          path.resolve(__dirname, 'src', 'font'),
          path.resolve(__dirname, 'node_modules')
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[hash].[ext]',
              publicPath: path => {
                return '../' + path;
              }
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },

  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    },
    minimizer: isProduction
      ? [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              compress: {
                drop_console: true
              }
            }
          })
        ]
      : []
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './src/views/index.ejs',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'about.html',
      template: './src/views/about.ejs',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new MiniCssExtractPlugin({
      filename: './assets/css/style.css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    open: true,
    compress: true,
    hot: true
  }
};

if (isProduction) {
  module.exports.plugins.push(new CleanWebpackPlugin(['dist']));
}
