const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'development',
	output: {
		clean: true,
		filename: '[name].js',
		assetModuleFilename: '[path][name][ext][query]',
	},

	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		watchFiles: {
			paths: ['src/**/*.*', 'assets/scss/**/*.*'],
			options: {
				usePolling: true,
			},
		},
		historyApiFallback: true,
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	watchOptions: {
		ignored: /node_modules/,
	},

	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(c|sa|sc)ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1,
							modules: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [require('postcss-preset-env')],
							},
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	stats: {
		preset: 'minimal',
	},
});
