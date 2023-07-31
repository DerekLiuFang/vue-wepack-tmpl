const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = merge(baseConfig, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
});
