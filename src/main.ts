import { createApp } from 'vue'
import './styles.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'uno.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Icon } from '@iconify/vue'

// import request from './utils/request'

const app = createApp(App)
const pinia = createPinia()

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('Icon', Icon)
app.use(pinia).use(router)
app.mount('#app')
