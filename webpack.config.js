const path = require("path");

module.exports = {
  entry: "./blocks/bottin-block/index.js",
  output: {
    path: path.resolve(__dirname, "blocks/bottin-block/build"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /.js/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
