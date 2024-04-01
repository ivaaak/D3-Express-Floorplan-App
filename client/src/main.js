import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './vuetify.js'; // Ensure this path is correct
import 'vuetify/dist/vuetify.css';
import axios from 'axios';

// Set the base URL for Axios
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL; // localhost:3000 setup in .env

createApp(App).use(vuetify).mount('#app');