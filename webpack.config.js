module.exports = {
  entry: ['babel-polyfill','./frontend/src/app.js'],
  output: {
    path:__dirname+'/',
    filename: './frontend/bundle.js'
  },
  devtool:'source-map',
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      }
    }
    ]
  }
};