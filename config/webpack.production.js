var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function buildConfig() {
  return {
    mode: 'production',
    context: path.resolve(__dirname, '..'),
    entry: {
      main: path.join(__dirname, '..', 'src', 'index.js')
    },
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: 'flycomponents.js',
      libraryTarget: 'umd',
      library: 'flycomponents'
    },
    externals: {
      accounting: {
        root: 'accounting',
        commonjs2: 'accounting',
        commonjs: 'accounting',
        amd: 'accounting'
      },
      'fuse.js': {
        root: 'Fuse',
        commonjs2: 'fuse.js',
        commonjs: 'fuse.js',
        amd: 'fuse.js'
      },
      classnames: {
        root: 'classNames',
        commonjs2: 'classnames',
        commonjs: 'classnames',
        amd: 'classnames'
      },
      'dom-scroll-into-view': {
        root: 'dom-scroll-into-view',
        commonjs2: 'dom-scroll-into-view',
        commonjs: 'dom-scroll-into-view',
        amd: 'dom-scroll-into-view'
      },
      moment: {
        root: 'moment',
        commonjs2: 'moment',
        commonjs: 'moment',
        amd: 'moment'
      },
      'prop-types': {
        root: 'PropTypes',
        commonjs2: 'prop-types',
        commonjs: 'prop-types',
        amd: 'prop-types'
      },
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'react-onclickoutside': {
        root: 'react-onclickoutside',
        commonjs2: 'react-onclickoutside',
        commonjs: 'react-onclickoutside',
        amd: 'react-onclickoutside'
      }
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            ecma: 8,
            ie8: false,
            compress: {
              warnings: false
            },
            output: {
              comments: false
            }
          }
        })
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.ContextReplacementPlugin(
        /moment[\/\\]locale$/,
        /en|es|fr|ja|ko|pt|zh-cn|id|ar/
      )
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
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  };
}

module.exports = (function() {
  return buildConfig();
})();
