<script lang="ts">

import Home from "./pages/Home.vue"
import Sidebar from "./specifics/menu/Sidebar.vue";
import Header from "./specifics/menu/Header.vue";
import Modal from "./generics/Modal/Modal.vue";
import AddUser from "./specifics/user/AddUser.vue";
import EditUser from "./specifics/user/EditUser.vue"
import { AuthTokenData, SecurityService } from "../services/SecurityService";
import SignIn from "./pages/SignIn.vue";
import { UserStore } from "../stores/UserStore";
import LoadingScreen from "./generics/LoadingScreen/LoadingScreen.vue";

const securityService = new SecurityService()

export default {

	components: {
		LoadingScreen,
		SignIn,
		Modal,
		Headers,
		Header,
		Sidebar,
		Home,
		AddUser,
		EditUser
	},

	data() {
		return {
			isAuth: SecurityService.isAuth(),
			payload: securityService.getAuthTokenData() as AuthTokenData,
			authUser: UserStore(state => state.authUser),
			loading: false
		}
	},

	methods: {},

	computed: {},

	mounted() {
		if (this.payload) {
			this.loading = true;
			UserStore(state => {
				state.findAuthUser(this.payload.sub).then(() => {
					// Nothing to do
				}).catch(() => {
					securityService.removeToken();
					window.location.reload();
				}).finally(() => {
					this.loading = false;
				});
			})
		}
	}

}

</script>

<template>
    <main v-if="!isAuth">
        <SignIn/>
    </main>

    <LoadingScreen v-if="loading"/>

    <main class="main auth-container" v-if="isAuth && authUser">
        <Sidebar/>
        <div class="main-content">
            <!-- <Header/> -->
            <router-view/>
        </div>
        <Modal/>
    </main>
</template>

<style scoped>
.main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.auth-container {
    background: url("/assets/images/bg3.jpg") hsl(208, 33%, 21%) no-repeat center center fixed;
    background-size: cover;
}

.main-content {
    position: relative;
    width: 100%;
    height: 100%;
    top: 0;
    overflow-y: auto;
}
</style>
