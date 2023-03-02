const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'inline-source-map' : false;

console.log(`${process.env.NODE_ENV} mode:`);

module.exports = {
	target,
	devtool,
	context: path.resolve(__dirname, '../src'),
	entry: ['@babel/polyfill', '/main.js'],
	output: {
		path: path.resolve(__dirname, '../dist'),
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[contenthash].css',
			chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
		}),
		new HTMLWebpackPlugin({
			template: 'index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
				],
			},
			{
				test: /\.(?:ico|jpe?g|webp|gif|png)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff2?|svg)$/i,
				type: 'asset/inline',
			},
			{
				test: /\.m?js$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	resolve: {
		modules: [path.resolve(__dirname, '../src'), 'node_modules'],
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': path.resolve(__dirname, '../src'),
		},
	},
};
