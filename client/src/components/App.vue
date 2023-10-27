<script lang="ts">
import { mapGetters, mapActions } from "vuex";

import Home from "./pages/Home.vue"
import User from "./specifics/Sidebar.vue";
import Header from "./specifics/Header.vue";
import Modal from "./generics/Modal.vue";
import AddUser from "./specifics/user/AddUser.vue";
import EditUser from "./specifics/user/EditUser.vue"

export default {

  components: {
	  Modal,
    Headers,
    Header,
    User,
    Home,
    AddUser,
    EditUser
  },

  methods: {
    ...mapActions(["addByUserId"]),
  },

  computed: {
    ...mapGetters(["getByUserId"]),
  },

  mounted() {


  }
}


</script>

<template>
  <main class="main">
    <User/>
    <div class="main-content">
      <Header/>
      <router-view />
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

  .main-content {
    position: relative;
    width: 100%;
      height: 100%;
    top: 0;
  }
</style>
