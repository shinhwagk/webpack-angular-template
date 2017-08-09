const path = require('path')

const webpack = require('webpack')
const ngtools = require('@ngtools/webpack')

module.exports = {
  context: __dirname,
  entry: {
    'main': "main.ts",
    'polyfills': "src/polyfills.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/assets/",
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: '@ngtools/webpack' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.scss$/, use: ['raw-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|svg)$/, loader: "file-loader", options: { name: 'images/[name].[ext]' } }
    ]
  },
  // externals: {
  //   '@angular/core': 'commonjs @angular/core',
  //   '@angular/compiler': 'commonjs @angular/compiler',
  //   '@angular/platform-browser': 'commonjs @angular/platform-browser',
  //   '@angular/platform-browser-dynamic': 'commonjs @angular/platform-browser-dynamic',
  //   '@angular/forms': 'commonjs @angular/forms',
  //   '@angular/common': 'commonjs @angular/common',
  //   'mz': 'commonjs mz',
  //   'path': 'commonjs path',
  //   'rxjs': 'commonjs rxjs',
  //   'zone.js': 'commonjs zone.js/dist/zone.js',
  // },
  plugins: [
    new ngtools.AotPlugin({ tsConfigPath: path.join(__dirname, "tsconfig.json"), entryModule: path.join(__dirname, "src", "app.module#AppModule") }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}