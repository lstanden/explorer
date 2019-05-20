const withSass = require("@zeit/next-sass");
const webpack = require("webpack");

const {parsed} = require("dotenv").config();

module.exports = withSass({
  cssModules: true,
  useFileSystemPublicRoutes: false,
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(parsed));
    return config;
  }
});
