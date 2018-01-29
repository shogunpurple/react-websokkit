const baseWebpackConfig = require("./webpack.config");

module.exports = Object.assign(baseWebpackConfig, { 
  output: {
    filename: "react-websokkit.js"
  },
  mode: "production",
  externals: ["react", "react-dom"]
});