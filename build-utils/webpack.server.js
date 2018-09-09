const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

/**
 *
 * @param {string} mode
 * Will return an object with following properties {entry, watch, plugins}
 */
function getWebpackServerConfig(mode) {
  /*
    Default entry, watch, plugins for development mode.
  */
  let entry = ['webpack/hot/poll?1000', './server/index'];
  let watch = true;
  let plugins = [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    new webpack.DefinePlugin({
      BUILD_TARGET: JSON.stringify('server')
    })
  ];

  if (mode === 'production') {
    entry = './server/index';
    watch = false;
    plugins = [];
  }

  return { entry, watch, plugins };
}

module.exports = (mode = 'development') => ({
  ...getWebpackServerConfig(mode),
  devtool: 'sourcemap',
  target: 'node',
  watchOptions: {
    poll: true
  },
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
  output: { filename: 'server.js' }
});
