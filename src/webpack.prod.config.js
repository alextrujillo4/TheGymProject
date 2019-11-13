const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getStyleUse(bundleFilename) {
  return [
    {
      loader: 'file-loader',
      options: {
        name: bundleFilename,
      },
    },
    { loader: 'extract-loader' },
    { loader: 'css-loader' },
    {
      loader: 'sass-loader',
      options: {
        includePaths: ['./node_modules'],
        implementation: require('dart-sass'),
        fiber: require('fibers'),
      }
    },
  ];
}

module.exports = [
  {
    entry: './scss/login.scss',
    output: {
      path: path.resolve(__dirname, "../public"),
      // This is necessary for webpack to compile, but we never reference this js file.
      filename: 'style-bundle-login.js',
    },
    module: {
      rules: [{
        test: /login.scss$/,
        use: getStyleUse('bundle-login.css')
      }]
    },
  },
  {
    entry: './scss/home.scss',
    output: {
      path: path.resolve(__dirname, "../public"),
      // This is necessary for webpack to compile, but we never reference this js file.
      filename: 'style-bundle-home.js',
    },
    module: {
      rules: [{
        test: /home.scss$/,
        use: getStyleUse('bundle-home.css')
      }]
    },
  },

  //================= JS FILES AND HTML  ====================
  {
    entry: "./js/login.js",
    output: {
      path: path.resolve(__dirname, "../public/"),
      filename: "bundle-login.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        template: 'index.html',
        filename: 'index.html' //relative to root of the application
      })
    ],
    module: {
      loaders: [{
        test: /login.js$/,
        loader: 'babel-loader',
        query: {presets: ['env']}
      }]
    },
  },
  {
    entry: "./js/home.js",
    output: {
      path: path.resolve(__dirname, "../public/"),
      filename: "bundle-home.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        template: 'home.html',
        filename: 'home.html' //relative to root of the application
      })
    ],
    module: {
      loaders: [{
        test: /home.js$/,
        loader: 'babel-loader',
        query: {presets: ['env']}
      }]
    },
  }
];