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
   styles: {
      css: [{
        include: /\.css$/,
        css: {
          modules: true,
          localIdentName: '[name]__[local]__[hash:base64:5]'
        }
      }]
    },
    extra: {
      module: {
        rules: [
          {test: /\.txt/, loader: 'raw-loader'}
        ]
      }
    }
  }
}
