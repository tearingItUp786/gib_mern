const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  entry: './client/js/ClientApp.jsx',
  devServer: {
    hot: true,
    port: 9000
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Custom template',
      // Load a custom template (lodash by default see the FAQ for details)
      template: './client/index.html'
    })
  ],
  output: {
    filename: 'client_bundle.js'
  }
});
