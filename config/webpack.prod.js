const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

// const path = require('path');
const common = require('./webpack.common');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	output: {
		clean: true,
		filename: '[name].[contenthash].bundle.js',
		assetModuleFilename: '[path][hash][query]',
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
		// new CopyPlugin({
		// 	patterns: [
		// 		{
		// 			from: path.resolve(__dirname, '../src/assets'),
		// 			to: path.resolve(__dirname, '../dist/assets'),
		// 		},
		// 	],
		// }),
	],

	module: {
		rules: [
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: false,
							modules: false,
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},

	optimization: {
		minimize: true,
		minimizer: [new HtmlMinimizerPlugin(), new CssMinimizerPlugin(), new TerserPlugin(), '...'],
		runtimeChunk: {
			name: 'runtime',
		},
	},

	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	stats: {
		preset: 'errors-warnings',
	},
});
