const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  target: 'node',
  entry: path.resolve(__dirname, '..', './src/server.ts'),
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      { test: /\.(scss|css)$/, loader: "ignore-loader" }    
    ],
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '..', './dist'),
  },
  plugins: [],
  externals: [webpackNodeExternals()],
}
