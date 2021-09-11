const path = require("path");
const packageJson = require("./package.json");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
const webpack = require("webpack"); //to access built-in plugins
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: packageJson.name + ".js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets",
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: true,
    host: "0.0.0.0",
    port: 3000,
  },
};
