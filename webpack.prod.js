const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "source-map",
  mode: "production",
  stats: {
    children: false
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/assets/index.html",
      filename: "index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css"
    })
  ]
});
