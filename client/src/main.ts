import { createApp } from "vue";
import { createStore } from "vuex";

import "./style.css";
import  "./components/generics/Icon/css/icons.css";

import App from "./App.vue";
import {ClocksStore} from "./stores/ClocksStore";
import {WorkingTimeStore} from "./stores/WorkingTimeStore";
import router from "./router";

// Create a new store instance.
const store = createStore({
	modules: {
		Clocks: ClocksStore,
		WorkingTime: WorkingTimeStore
	}
})

createApp(App)
	.use(store)
	.use(router)
	.mount('#app')
