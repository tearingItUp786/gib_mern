const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

// if you go into the build-utils for webpack.server, you will see that what is returned from export
// is a function and therefore, we call that function that returns an object that webpack can use
// we pass along the side parameter because that's just good functional manners :)
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
