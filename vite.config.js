import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // 启用scss新版API
        additionalData: '@use "@/assets/utils.scss" as *;', // 一定要将其他地方引入该css文件的地方删除，如index.html,否则会提示已经加载该module的错误！！！
      },
    },
  },
  server: {
    host: '192.168.1.159',
    port: 8080,
    open: true,
    cors: true, // 允许跨域。
    // 设置代理
    proxy: {
      "/ilsp": {
        target: "http://10.79.89.9:8050/",
        changeOrigin: true, // 是否跨域
        secure: true, // 是否https接口
      },
    },
  },
})
