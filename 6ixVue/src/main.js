import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/main';
const app = createApp(App);

app.use(router); // Utiliser le routeur
app.mount('#app');
