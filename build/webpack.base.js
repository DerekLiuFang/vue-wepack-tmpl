const path = require("node:path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  // 入口文件
  entry: path.join(__dirname, "../src/index.ts"),

  output: {
    filename: "static/js/[name].js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.(js|ts)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
    }),
  ],
  // 解析配置
  resolve: {
    // 当引入模块未带后缀时，依次添加配置后缀查找
    extensions: [".vue", ".ts", ".js", ".json"],
  },
  optimization: {},
};
