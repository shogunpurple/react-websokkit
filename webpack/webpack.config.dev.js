const baseWebpackConfig = require("./webpack.config");

module.exports = Object.assign(baseWebpackConfig, { mode: "development" });