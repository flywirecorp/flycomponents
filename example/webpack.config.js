const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname, './src'),
	resolve: {
		modules: [
			path.resolve(__dirname, './src'),
			'node_modules',
			path.resolve(__dirname, '../components')
		]
	},
	entry: {
		app: './app.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './dist/assets'),
		publicPath: '/assets'
	},
	devServer: {
		contentBase: path.resolve(__dirname, './src')
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: [
              path.resolve(__dirname, './node_modules/babel-preset-react'),
              path.resolve(__dirname, './node_modules/babel-preset-stage-2')
            ]
					}
				}]
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	}
};
