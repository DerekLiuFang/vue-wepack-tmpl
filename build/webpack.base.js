const path = require("node:path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Webpack = require("webpack");

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
        use: ["thread-loader", "vue-loader"],
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的vue进行loader解析,
      },
      {
        test: /\.(js|ts)$/,
        use: ["thread-loader", "babel-loader"],
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的ts进行loader解析
      },
      {
        test: /\.css$/, //匹配所有的 css 文件
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/, //匹配所有的 less 文件
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset, 在导出一个 data URI 和发送一个单独的文件之间自动选择
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset, 在导出一个 data URI 和发送一个单独的文件之间自动选择
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name][ext]", // 文件输出目录和命名
        },
      },

      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset, 在导出一个 data URI 和发送一个单独的文件之间自动选择
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
    }),
    new Webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  // 解析配置
  resolve: {
    // 当引入模块未带后缀时，依次添加配置后缀查找
    extensions: [".vue", ".ts", ".js", ".json"],
    alias: {
      "@": path.join(__dirname, "../src"),
    },
    // 查找第三方模块只在本项目的node_modules中查找.如果用的是pnpm 就暂时不要配置这个，会有幽灵依赖的问题，访问不到很多模块。
    // modules: [path.resolve(__dirname, "../node_modules")],
  },
  // 开启持久化换成，提升构建效率
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  optimization: {},
};
