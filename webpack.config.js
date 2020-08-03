const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");

// This is our JavaScript rule that specifies what to do with .js files
const javascript = {
  test: /\.(js)$/,
  use: [
    {
      loader: "babel-loader",
      options: { presets: ["es2015"] }, // this is one way of passing options
    },
  ],
};

const postcss = {
  loader: "postcss-loader",
  options: {
    plugins() {
      return [autoprefixer({ browsers: "last 3 versions" })];
    },
  },
};

// this is our sass/css loader. It handles files that are require('something.scss')
const styles = {
  test: /\.(scss)$/,
  // here we pass the options as query params b/c it's short.
  // remember above we used an object for each loader instead of just a string?
  // We don't just pass an array of loaders, we run them through the extract plugin so they can be outputted to their own .css file
  use: ExtractTextPlugin.extract([
    "css-loader?sourceMap",
    postcss,
    "sass-loader?sourceMap",
  ]),
};

// OK - now it's time to put it all together
const config = {
  entry: {
    // we only have 1 entry, but I've set it up for multiple in the future
    App: "./src/js/main.js",
    Editor: "./src/js/modules/editor.js",
    Project: "./src/js/modules/projects.js",
  },
  // we're using sourcemaps and here is where we specify which kind of sourcemap to use
  devtool: "source-map",
  // Once things are done, we kick it out to a file.
  output: {
    // path is a built in node module
    // __dirname is a variable from node that gives us the
    path: path.resolve(__dirname, "flaskapp", "static"),
    // we can use "substitutions" in file names like [name] and [hash]
    // name will be `App` because that is what we used above in our entry
    filename: "[name].bundle.js",
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  // remember we said webpack sees everthing as modules and how different loaders are responsible for different file types? Here is is where we implement them. Pass it the rules for our JS and our styles
  module: {
    rules: [
      javascript,
      styles,
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  // finally we pass it an array of our plugins - uncomment if you want to uglify
  plugins: [
    // uglify,
    // here is where we tell it to output our css to a separate file
    new ExtractTextPlugin("style.css"),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /style.css$/,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
  ],
};

// webpack is cranky about some packages using a soon to be deprecated API. shhhhhhh
process.noDeprecation = true;

module.exports = config;
