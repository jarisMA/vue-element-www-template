# vue element www template

## Project setup

```
yarn install
```

## 配置 HOST

```
127.0.0.1 域名
```

## Touch .env.local

```
NODE_ENV=local
VUE_APP_DOMAIN=域名
VUE_APP_TOKEN=token名称
VUE_APP_HOST=接口地址
VUE_APP_WECHAT_APPID=APPID
```

## Compiles and hot-reloads for development

```
sudo yarn serve
```

## Element

> https://element.eleme.io/#/zh-CN/theme

修改主体颜色，下载 theme 放置在 /theme 文件中

## SVG

svg 放置在 /src/plugins/icons/svg 文件夹中, svg-name 为 svg 文件名。

```
<icon-svg svg-class="homework-svg-class" svg-name="demo"></icon-svg>
```
