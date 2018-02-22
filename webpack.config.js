module.exports = {
  entry: './frontend/src/app.js',
  output: {
    filename: './frontend/bundle.js'
  },
  module:{
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  }
};