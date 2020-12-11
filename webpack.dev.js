const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');




const conf = merge(common('development'), {
  output: {
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(tsx?|js)$/,
        exclude: [/node_modules/, /tests/],
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/view/index.ejs',
      filename: 'index.html',
      chunks: ['main']
    })
  ],
  devServer: {
    contentBase: __dirname,
    compress: true,
    historyApiFallback: {
      index: 'index.html',
      rewrites: [
        { from: /\/*/, to: '/index.html' }
      ]
    },    
    overlay: true,
    publicPath: "/",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  }
});

// console.log(conf.module.rules)
module.exports = conf
