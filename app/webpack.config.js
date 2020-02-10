const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const convertPathsToAliases = require("convert-tsconfig-paths-to-webpack-aliases")
  .default;
const tsconfig = require("./tsconfig.json");

function cachedLoader(use) {
  if (!Array.isArray(use)) use = [use];
  return [
    {
      loader: "cache-loader",
      options: { cacheDirectory: ".cache" }
    }
  ].concat(use);
}
module.exports = {
  mode: "development",
  target: "web",
  entry: path.join(__dirname, "src/index.tsx"),
  devServer: {
    overlay: true,
    clientLogLevel: "error",
    stats: "errors-only",
    watchOptions: {
      poll: true
    }
  },

  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/__tests__/, /node_modules/, /\.styles\.ts$/],
        use: cachedLoader({
          loader: "ts-loader",
          options: { transpileOnly: true, experimentalWatchApi: true }
        })
      },
      {
        test: /\.styles\.ts$/,
        use: [
          {
            loader: require.resolve("linaria/loader")
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader", options: { singleton: true } },
          "css-loader",
          "css-validator-loader"
        ],
        exclude: /\.linaria.css$/
      },
      {
        test: /\.linaria.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "css-validator-loader" }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "./node_modules"), path.resolve("./src")],
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: convertPathsToAliases(tsconfig)
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-styles.linaria.css"
    })
  ]
};
