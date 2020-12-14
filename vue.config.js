const path = require("path");

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    open: true,
    host: "test.home-plan.cn",
    port: 80,
    // proxy: {
    //   "/api": {
    //     // target: "https://api.home-plan.cn",
    //     target: "http://homeplan-api.test",
    //     changeOrigin: true,
    //     secure: false
    //   },
    //   "/upload": {
    //     target: "http://homeplan-api.test",
    //     pathRewrite: {
    //       "^/upload": "/api"
    //     },
    //     changeOrigin: true,
    //     secure: false
    //   }
    // }
  },

  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/plugins/icons/svg"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/plugins/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
    config.resolve.alias
      .set("assets", resolve("src/assets"))
      .set("images", resolve("src/assets/images"))
      .set("styles", resolve("src/assets/styles"))
      .set("components", resolve("src/components"))
      .set("utils", resolve("src/utils"));
  }
};
