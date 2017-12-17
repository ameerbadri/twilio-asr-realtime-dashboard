const webpackConfig = require('./webpack.config')
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = (config) => {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha'],
    files: ['tests/env.js', 'tests.webpack.js'],
    preprocessors: {
      'tests/env.js': ['webpack', 'sourcemap'],
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    webpack: Object.assign(webpackConfig, {
      devtool: 'inline-source-map'
    }),
    webpackServer: {
      noInfo: true
    },
    reporters: ['mocha', 'coverage'],
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'json', dir: 'coverage', file: 'coverage.json' }
      ],
    }
  })
}
