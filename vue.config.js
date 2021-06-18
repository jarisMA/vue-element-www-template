const webpack = require("webpack");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "current_dist",
  devServer: {
    open: true,
    host: `www-test1${process.env.VUE_APP_DOMAIN}`,
    port: 80
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        "window.Quill": "quill"
      }
    ]);
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
      .set("plugins", resolve("src/plugins"))
      .set("utils", resolve("src/utils"))
      .set("request", resolve("src/global/request"))
      .set("service", resolve("src/global/service"))
      .set("mixins", resolve("src/mixins"));
  }
};
