const path = require('path')

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactImageAnnotation',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    html: {
      template: 'demo/src/index.html'
    },
    extra: {
      module: {
        rules: [
          {test: /\.txt/, loader: 'raw-loader'}
        ]
      }
    }
  },
  karma: {
    testContext: 'tests/index.test.js'
  }
}
