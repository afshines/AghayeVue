import { createApp } from 'vue'
import App from './App.vue'
import VueSmoothScroll from 'vue3-smooth-scroll'
import router from './router'
import i18n from './i18n'

const app = createApp(App).use(i18n).use(router)

app.use(VueSmoothScroll,
    {
        offset: -150,        
      })


app.mount('#app')