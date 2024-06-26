'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer:{
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/404.html',
      filename: '404.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/sign-up.html',
      filename: 'sign-up.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/sign-in.html',
      filename: 'sign-in.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/charts.html',
      filename: 'charts.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/chart.html',
      filename: 'chart.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/add-chart.html',
      filename: 'add-chart.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}