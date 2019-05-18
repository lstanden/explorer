const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./server",
  target: "node",
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "server.js"
  },
  context: path.resolve(__dirname, "src"),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["isomorphic-style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(jpg|jpeg)$/,
        loader: "file-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  plugins: [
    new AssetsPlugin({
      filename: "assets.js",
      path: path.resolve(__dirname, "..", "dist"),
      processOutput: assets => `module.exports=${JSON.stringify(assets)}`
    })
  ],
  externals: [/^\.\/assets/]
};
