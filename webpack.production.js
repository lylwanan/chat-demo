const path = require('path')
const webpack = require('webpack')
var pkg = require('./package.json')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var config = {
  entry: {
    main: path.resolve(__dirname, './src/index.tsx'),
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
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
      test: /\.styl$/, exclude: /node_modules/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader', use: [{
          loader: 'css-loader',
          options: { minimize: true }
        }, {
          loader: 'postcss-loader',
          options: { plugins: () => [autoprefixer({ browsers: ['last 5 versions'] })] }
        }, 'stylus-loader']
      })
    }, {
      test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract({
        fallback: 'style-loader', use: [{
          loader: 'css-loader',
          options: { minimize: true }
        }, {
          loader: 'postcss-loader',
          options: { plugins: () => [autoprefixer({ browsers: ['last 5 versions'] })] }
        }]
      })
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
    new ExtractTextPlugin('css/[name].[hash:8].css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[hash:8].js'
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    new webpack.BannerPlugin("Copyright by liuyonglang."),

    new webpack.HotModuleReplacementPlugin(),
    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'"
      }
    }),
    
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true)
  ]
}

module.exports = config