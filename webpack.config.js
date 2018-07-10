const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const sideConfig = aSide => require(`./build-utils/webpack.${aSide}`)(aSide);

module.exports = ({ mode, side } = { mode: 'development', side: 'back' }) =>
  webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /.jsx?$/,
            use: ['eslint-loader'],
            exclude: /node_modules/
          },
          {
            test: /.jsx?$/,
            use: 'babel-loader'
          }
        ]
      },
      output: {
        filename: 'bundle.js'
      },
      plugins: [new webpack.ProgressPlugin()]
    },
    sideConfig(side)
  );
