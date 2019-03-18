const path = require("path");
const webpack = require("webpack");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./client/src/index.jsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@css": path.resolve(__dirname, "client/assets/css"),
      "@images": path.resolve(__dirname, "client/assets/images"),
      "@pages": path.resolve(__dirname, "client/src/components/pages/index.js"),
      "@routes": path.resolve(__dirname, "client/src/routes/index.js")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader?cacheDirectory=true",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-runtime",
                "@babel/plugin-transform-arrow-functions"
              ]
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                autoprefixer(),
                cssnano({
                  preset: "default"
                })
              ],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader?name=fonts/[name].[ext]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use:
          "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: "file-loader?name=images/[name].[ext]"
      },
      {
        // 'sideEffects': false
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "lodash"
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CopyWebpackPlugin([
      {
        from: "client/assets/manifest.json",
        to: "./manifest.json"
      },
      {
        from: "client/assets/images/logo.png",
        to: "./logo.png"
      }
    ])
  ]
};
