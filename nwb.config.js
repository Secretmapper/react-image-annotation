const path = require('path');

module.exports = () => {
  return {
    type: 'react-app',
    npm: {
      esModules: true,
      umd: {
        global: 'nwb-template',
        externals: {
          react: 'React',
        },
      },
    },
    webpack: {
      html: {
        template: 'demo/src/index.html',
      },
      config: config => {
        config.entry = './demo/src/index';
        config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
        config.module.rules.push({
          test: /\.tsx?$/,
          loader: 'ts-loader',
        });
        config.module.rules.push({ test: /\.txt/, loader: 'raw-loader' });

        return config;
      },
    },
    karma: {
      testContext: 'tests/index.test.js',
    },
  };
};
