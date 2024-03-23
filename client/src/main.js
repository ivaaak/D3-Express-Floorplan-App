import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './services/vuetify.js'; // Ensure this path is correct
import 'vuetify/dist/vuetify.css';

createApp(App).use(vuetify).mount('#app');