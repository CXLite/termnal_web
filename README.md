# TermnalWeb

CXLite的前端页面项目

使用xterm.js在浏览器中展示一个伪终端

## WebView支持
为了能够支持低版本WebView做了一下配置

vite 打包配置
```js
// vite.config.js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import legacy from '@vitejs/plugin-legacy'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
  base: './', // 确保使用相对路径
  plugins: [
    vue(),
    vueDevTools(),
    legacy({
      targets: ['defaults', 'not IE 11', 'chrome >= 52'], // 使用正确的浏览器查询
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // 面向旧版浏览器时需要的插件
      modernPolyfills: ['es.global-this'],
    }),
    esbuild({
      target: ['chrome52', 'chrome64'], // 替换成你想要的谷歌内核版本
      loaders: {
        '.vue': 'js',
        '.ts': 'js'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

```

运行项目还出现找不到`globalthis`以及`replaceChildren`这两个方法的问题，所以在项目根入口添加

```js
// main.js

// Polyfill for replaceChildren
if (!Element.prototype.replaceChildren) {
    Element.prototype.replaceChildren = function(...nodes) {
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      this.append(...nodes);
    };
}

import 'globalthis/polyfill';
```

