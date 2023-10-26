import { createApp } from 'vue'
import { createStore } from 'vuex'
import './style.css'
import App from './App.vue'
import {ClocksStore} from "./stores/ClocksStore";

// Create a new store instance.
const store = createStore({
	modules: {
		Clocks: ClocksStore
	}
})

createApp(App)
	.use(store)
	.mount('#app')
