var Webpack         = require('webpack')
var env             = require('./environment')
var path            = require('path')
var pkg             = require('../package')

module.exports = {

  context: env.root,

  devtool: env.isDevelopment ? 'inline-source-map' : 'source-map',

  entry: [ pkg.main ],

  output: {
    path: path.resolve(env.root, 'dist'),
    filename: 'application.js',
    publicPath: '/'
  },

  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],

  node: {
    Buffer: false,
    process: false
  },

  resolve: {
    modulesDirectories: [ 'node_modules', '.', './app', './lib', './vendor' ],
    extensions: [ '', '.js', '.jsx' ]
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        loader: 'babel',
        exclude: [ /node_modules/ ],
        query: env.babel
      }
    ]
  },

  devServer: {
    noInfo: true,
    publicPath: '/'
  }

}
