const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");

const smp = new SpeedMeasurePlugin(); // 实例化分析插件

/**
 * @type {import('webpack').Configuration}
 */
module.exports = smp.wrap(merge(prodConfig, {})); // 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
