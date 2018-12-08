/* eslint-disable */
// require('dotenv').config()
const webpack = require('webpack')

const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './styles/antd-custom.less'),
    'utf8'
  )
)

class FilterPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap(
      'FilterPlugin',
      (compilation) => {
        compilation.warnings = (compilation.warnings).filter(
          warning => !this.options.filter.test(warning.message)
        );
      }
    );
  }
}

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables,
  },
  webpack: config => {
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      new FilterPlugin({ filter: /chunk styles \[mini-css-extract-plugin]\nConflicting order between:/ }),
      new webpack.DefinePlugin({
        'process.env': {
          GOOGLE_MAPS_KEY_API: JSON.stringify(process.env.GOOGLE_MAPS_KEY_API),
          X_API_KEY: JSON.stringify(process.env.X_API_KEY),
        },
      }),
    ]

    return config
  },
})