const { join } = require('path');
const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

var exports = [{
    name: 'client',
    entry: {
      main: join(__dirname, 'client/main.tsx')
    },
    devtool: 'eval',
    context: __dirname,
    output: {
      pathinfo: true,
      path: join(__dirname, 'public', 'assets', 'js'),
      filename: 'bundle.js',
    },
    plugins: [
      new SWPrecacheWebpackPlugin({
        cacheId: 'blacknoise',
        filepath: join(__dirname, 'public/sw.js'),
        minify: true,
        staticFileGlobs: [
          'public/assets/{img,audio,css}/*.*'
        ],
        stripPrefix: 'public'
      })
    ],
    resolve: {
      extensions: ['.tsx', '.js'],
      modules: ['node_modules'],
    },
    module: {
      rules: [{
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: ['awesome-typescript-loader']
      }]
    }
  }, {
  name: 'server',
  entry: join(__dirname, 'app.tsx'),
  target: 'node',
  context: __dirname,
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
      exclude: /node_modules/,
      use: ['awesome-typescript-loader']
    }]
  }
}];

if (process.env.NODE_ENV === 'production') {
  delete exports[0].devtool;

  exports[0].plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false })
  );
}

module.exports = exports;
