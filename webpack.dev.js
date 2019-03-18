const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  watch: true,
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
    inline: true,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "dist"),
    stats: "errors-only"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/assets/index.html",
      filename: "index.html",
      inject: "body"
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ]
});
