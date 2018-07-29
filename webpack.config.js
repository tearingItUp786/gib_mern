const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
// if you go into the build-utils for webpack.server, you will see that what is returned from export
// is a function and therefore, we call that function that returns an object that webpack can use
// we pass along the side parameter because that's just good functional manners :)

/* eslint-disable */
const sideConfig = ({ side, mode }) => require(`./build-utils/webpack.${side}`)(mode);
/* eslint-enable */

module.exports = ({ mode, side } = { mode: 'development', side: 'client' }) =>
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
      plugins: [new Dotenv(), new webpack.ProgressPlugin()]
    },
    sideConfig({ side, mode })
  );
