import '@/assets/main.css'
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import router from './router'

const app = createApp(App)

app.use(Antd)
app.use(router)
app.use(createPinia())
app.mount('#app')
