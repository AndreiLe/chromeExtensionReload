'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");

var baseConfig = {
  mode: 'development',
  watch: true,
	watchOptions: {
		aggregateTimeout: 10,
		/* poll: 1000, */
		ignored: ['/node_modules/', '/src/html/', '/icons/', '/bin/', '/assets/']
	  },
  context: path.join(__dirname, '/public_html/'),
  entry: {
    'bin/index': ['./src/index.js', './src/scss/style.scss']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/public_html/'),
    publicPath: "/"
  },
  devtool: 'eval',
  module: {
		rules: [
		 {
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			use: {
			  loader: 'babel-loader'
			}
		  },
		  {
			test: /\.css$/,
			use: [
			  MiniCssExtractPlugin.loader,
			  "css-loader"
			]
		  },
		  {
			test: /\.(sa|sc)ss$/,
			use: [
			  'css-hot-loader',
			  MiniCssExtractPlugin.loader,
			  {
				  loader: 'css-loader'
				},
				{
				  loader: 'sass-loader'
				}
			]
		  }
		]
	  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: "bin/style.css",
      allChunks: true
    })
  ]
};

module.exports = baseConfig;