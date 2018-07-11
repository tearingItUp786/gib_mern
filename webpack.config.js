const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const sideConfig = side => require(`./build-utils/webpack.${side}`)(side);

module.exports = ({ mode, side } = { mode: 'production', side: 'server' }) =>
  webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: '/node_modules/'
          }
        ]
      },
      plugins: [new webpack.ProgressPlugin()]
    },
    sideConfig(side)
  );
