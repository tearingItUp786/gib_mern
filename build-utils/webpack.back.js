/* eslint-disable */
const webpack = require('webpack');
/* eslint-enable */
module.exports = () => ({
  target: 'node',
  entry: ['webpack-hot-middleware/client?reload=true', './server/index.js'],
  output: {
    filename: 'bundle-backend.js'
  },
  plugins: [
    // OccurenceOrderPlugin is needed for webpack 1.x only
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
