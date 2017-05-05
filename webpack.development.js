var webpack = require('webpack')
var path = require('path')
var settings = {
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 8080
}

function buildConfig (options) {
  return {
    context: __dirname,
    target: 'web',
    entry: {
      main: path.join(__dirname, 'docs', 'src', 'index.js')
    },
    output: {
      path: path.join(__dirname, 'docs', 'dist'),
      filename: 'flycomponents.js',
      publicPath: '/dist',
    },
    devServer: {
      contentBase: './docs',
      inline: true,
      historyApiFallback: true,
      host: options.ip,
      hot: true,
      noInfo: false,
      port: options.port,
      disableHostCheck: true,
      stats: {
        colors: true,
        reasons: true,
        chunks: true
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.md/,
          use: 'raw-loader'
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: path.join(__dirname, 'node_modules'),
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}

module.exports = (function (options) {
  return buildConfig(options)
})(settings)
