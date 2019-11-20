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
    entry: "./js/firebase/index.js",
    output: {
      path: path.resolve(__dirname, "../public/firebase/index.js"),
      filename: "fire.js"
    },
    module: {
      loaders: [{
        test: /index.js$/,
        loader: 'babel-loader',
        query: {presets: ['env']}
      }]
    },
  },
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
  },

  //=================================== ADD REGISTER FOR PRODUCTION
  {
    entry: './scss/register.scss',
    output: {
      path: path.resolve(__dirname, "../public/"),
      filename: 'style-bundle-register.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        template: 'register.html',
        filename: 'register.html' //relative to root of the application
      })
    ],
    module: {
      rules: [{
        test: /register.scss$/,
        use: getStyleUse('bundle-register.css')
      }]
    },
  },
  {
    entry: "./js/register.js",
    output: {
      path: path.resolve(__dirname, "../public/"),
      filename: "bundle-register.js"
    },
    module: {
      loaders: [{
        test: /register.js$/,
        loader: 'babel-loader',
        query: {presets: ['env']}
      }]
    },
  },
  //=================================== END REGISTER FOR PRODUCTION
//=================================== ADD CREATE FOR PRODUCTION
  {
    entry: './scss/create.scss',
    output: {
      path: path.resolve(__dirname, "../public/"),
      filename: 'style-bundle-create.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        template: 'create.html',
        filename: 'create.html' //relative to root of the application
      })
    ],
    module: {
      rules: [{
        test: /create.scss$/,
        use: getStyleUse('bundle-create.css')
      }]
    },
  },
  {
    entry: "./js/create.js",
    output: {
      path: path.resolve(__dirname, "../public/"),
      filename: "bundle-create.js"
    },
    module: {
      loaders: [{
        test: /create.js$/,
        loader: 'babel-loader',
        query: {presets: ['env']}
      }]
    },
  }
  //=================================== END CREATE FOR PRODUCTION
];
