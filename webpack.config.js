var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/mdon.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  //   publicPath: '/'
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }, 
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // }
    ]
  },
  // plugins: [
  //   // new HtmlWebpackPlugin({
  //   //   title: 'mdon'
  //   // }),
  //   // new webpack.optimize.CommonsChunkPlugin({
  //   //   name: 'vendor'
  //   // }),
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  // devtool: 'cheap-module-eval-source-map',
  // devServer: {
  //   hot: true,
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   publicPath: '/'
  // },
  target: 'node'
  // node: {
  //   fs: 'empty'
  // }
}