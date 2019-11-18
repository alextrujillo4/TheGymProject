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
  {
    entry: "./js/login.js",
    output: {
      filename: "bundle-login.js"
    },
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
      filename: "bundle-home.js"
    },
    module: {
      loaders: [{
        test: /home.js$/,
        loader: 'babel-loader',
        query: {presets: ['env']}
      }]
    },
  },
  //=================================== REGISTER ADDED
  {
    entry: './scss/register.scss',
    output: {
      // This is necessary for webpack to compile, but we never reference this js file.
      filename: 'style-bundle-register.js',
    },
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
  //=================================== REGISTER ADDED
  //=================================== CREATE ADDED
  {
    entry: './scss/create.scss',
    output: {
      // This is necessary for webpack to compile, but we never reference this js file.
      filename: 'style-bundle-create.js',
    },
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
  //=================================== CREATE ADDED
];
