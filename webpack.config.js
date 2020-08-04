const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/polyfill');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: ['@babel/polyfill', './src/index.js'],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Wallet',
      template: './src/index.html',
    }),
  ],

  watch: isDev,
  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 3000,
    host: '192.168.1.33',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,

        loader: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['emotion'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
