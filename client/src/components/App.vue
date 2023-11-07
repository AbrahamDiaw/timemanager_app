<script lang="ts">

import Home from "./pages/Home.vue"
import Sidebar from "./specifics/Sidebar.vue";
import Header from "./specifics/Header.vue";
import Modal from "./generics/Modal.vue";
import AddUser from "./specifics/user/AddUser.vue";
import EditUser from "./specifics/user/EditUser.vue"
import { AuthTokenData, SecurityService } from "../services/SecurityService";
import SignIn from "./pages/SignIn.vue";
import { UserStore } from "../stores/UserStore";

const securityService = new SecurityService()

export default {

  components: {
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

    }
  },

  methods: {},

  computed: {},

  mounted() {
    if (this.payload) {
      UserStore(state => state.findAuthUser(this.payload.sub))
    }
  }
}


</script>

<template>
  <main class="main" v-if="isAuth">
<!--    <Sidebar/>-->
    <div class="main-content">
      <!--      <Header/>-->
      <router-view/>
    </div>
    <Modal/>
  </main>
  <main v-if="!isAuth">
    <div class="auth-content">
      <SignIn/>
    </div>
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

.main-content {
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
}

.auth-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
