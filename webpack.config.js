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
  context: path.join(__dirname, '/public_html/'),
  entry: {
    'settings/settings': ['./settings/settings.js']
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/public/'),
    publicPath: "/"
  },
  devtool: false,
  devServer: {
    historyApiFallback: false,
    hot: false,
    inline: false,
    progress: false,
    contentBase: [path.join(__dirname, 'public_html')],
    watchContentBase: true,
    port: 8081,
  },
  module: {
		rules: [
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