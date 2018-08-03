'use strict';

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var baseConfig = {
	mode: 'production',
	context: path.join(__dirname, '/public_html/'),
	entry: {
		'bin/index': ['./src/index.js', './src/scss/style.scss']
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '/public_html/'),
		publicPath: "/"
	},
	devtool: 'false',
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: false,
				parallel: true,
				sourceMap: false,
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false
          }
        }
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader'
				}
			}, {
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader"
				]
			}, {
				test: /\.(sa|sc)ss$/,
				use: [
					'css-hot-loader',
					MiniCssExtractPlugin.loader, {
						loader: 'css-loader',
						options: {
							minimize: true
						}
					}, {
						loader: 'postcss-loader',
						options: {
							plugins: (loader) => [
								require('autoprefixer'),
							]
						}
					}, {
						loader: 'resolve-url-loader'
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							includePaths: [
								path.join(__dirname, '/src')
							]
						}
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
