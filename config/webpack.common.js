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
	entry: ['@babel/polyfill', 'main.js'],
	output: {
		clean: true,
		path: path.resolve(__dirname, '../dist'),
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: 'template.html',
			filename: 'index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
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
