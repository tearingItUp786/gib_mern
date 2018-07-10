const nodeExternals = require('webpack-node-externals');

module.exports = () => ({
  target: 'node',
  entry: {
    app: ['./server/index.js']
  },
  output: {
    filename: 'bundle-backend.js'
  },
  externals: [nodeExternals()]
});
