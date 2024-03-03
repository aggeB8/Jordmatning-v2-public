import axios from 'axios'

import './assets/main.css'

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'http://verktyg.optimass.se'
} else {
    axios.defaults.baseURL = 'http://localhost:3000'
}

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
