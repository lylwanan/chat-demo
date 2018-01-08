const path = require('path')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
  entry: {
    main: path.resolve(__dirname, './src/index.tsx')
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }, {
      test: /\.tsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader?plugins[]=transform-vue-jsx!ts-loader'
    }, {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|gif|jpg|jpeg|bmp)$/i,
      loader: 'url-loader?limit=5000&name=img/[name].[hash:8].[ext]'
    },
    {
      test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
      loader: 'url-loader?limit=5000&name=fonts/[name].[hash:8].[ext]'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    }),

    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 4200,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
}

module.exports = config