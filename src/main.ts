import { createApp } from 'vue'
import { createPinia } from 'pinia' // Nhập Pinia
import './style.css'
import App from './App.vue'

// Khởi tạo App
const app = createApp(App)

// Kích hoạt Pinia (Kho chứa dữ liệu)
app.use(createPinia())

// Treo App lên tường
app.mount('#app')