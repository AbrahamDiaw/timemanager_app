import { createApp } from 'vue'
import { createStore } from 'vuex'
import './style.css'
import App from './App.vue'
import { UserStore } from "./stores/UserStore.ts";


// Create a new store instance.
const store = createStore({
	module: {
		Users: UserStore
	}
})

createApp(App)
	.use(store)
	.mount('#app')
