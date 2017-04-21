var webpack = require('webpack')
var path = require('path')
var settings = {
  isDevelopment: process.env.NODE_ENV !== 'production',
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 8080
}

function buildConfig (options) {
  return {
    context: __dirname,
    entry: {
      main: path.join(__dirname, 'src', 'index.js')
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'flycomponents.js',
      libraryTarget: 'umd',
      library: 'flycomponents'
    },
    devServer: {
      inline: true,
      host: options.ip,
      hot: true,
      noInfo: false,
      port: options.port,
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
      })
    ].concat(
      options.isDevelopment
        ? [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin()
        ]
          : [
            new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false,
                screw_ie8: true
              },
              output: {
                comments: false,
              }
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
          ]
    ),
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [require('autoprefixer')]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    }
  }
}

module.exports = (function (options) {
  return buildConfig(options)
})(settings)
