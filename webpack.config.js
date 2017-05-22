const { join } = require('path');
const webpack = require('webpack');

var exports = [];

const client = {
  name: 'client',
  entry: join(__dirname, 'client/main.tsx'),
  devtool: 'eval',
  output: {
    pathinfo: true,
    filename: 'bundle.js',
    path: join(__dirname, 'public', 'assets', 'js')
  },
  resolve: {
    extensions: ['.tsx', '.js'],
    modules: ['node_modules'],
  },
  module: {
    rules: [{
      test: /\.tsx$/,
      exclude: /(node_modules)/,
      use: ['babel-loader', 'ts-loader']
    }]
  }
};

const server = {
  name: 'server',
  entry: join(__dirname, 'app.tsx'),
  target: 'node',
  node: {
    __dirname: true
  },
  output: {
    filename: 'app.js',
    path: join(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    publicPath: join(__dirname, 'public')
  },
  resolve: {
    extensions: ['.tsx', '.js'],
    modules: [__dirname, 'node_modules'],
  },
  module: {
    rules: [{
      test: /\.tsx$/,
      exclude: /(node_modules)/,
      use: [ 'babel-loader', 'ts-loader' ]
    }]
  }
};

if (process.env.NODE_ENV === 'production') {
  delete client.devtool;

  client.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false })
  ];

  exports.push(server);
}

exports.push(client);

module.exports = exports;
