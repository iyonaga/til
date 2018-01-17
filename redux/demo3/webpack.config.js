const path = require('path');

module.exports = {
  entry: ["./src/index.jsx"],
  output: {
    path: __dirname+"/dist",
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015'],
              cacheDirectory: true
            }
          }
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
  },
}
