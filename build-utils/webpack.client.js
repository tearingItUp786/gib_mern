const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
  entry: './client/js/app.js',
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 9000
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/,
      //   use: ['vue-style-loader', 'css-loader']
      // }
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'GIB MERN',
      // Load a custom template (lodash by default see the FAQ for details)
      template: './client/index.html',
      favicon: './client/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  output: {
    filename: 'client_bundle.js'
  }
});
