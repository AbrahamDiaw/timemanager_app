import "./styles/globals.css";
import  "./components/generics/Icon/css/icons.css";

import { createApp } from "vue";
import App from "./components/App.vue";
import router from "./router";

createApp(App)
	.use(router)
	.mount('#app');