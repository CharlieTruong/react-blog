var webpack = require('webpack');

module.exports = {  
  entry: [
    'webpack/hot/only-dev-server',
    "./js/app.js"
  ],
  output: {
    path: __dirname + '/build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          'react-hot',
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-2'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    historyApiFallback: true
  }
};