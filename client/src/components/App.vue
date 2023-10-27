<script lang="ts">
import { mapGetters, mapActions } from "vuex";

import Home from "./pages/Home.vue"
import User from "./specifics/Sidebar.vue";
import Header from "./specifics/Header.vue";
import Modal from "./generics/Modal.vue";

export default {

  components: {
	  Modal,
    Headers,
    Header,
    User,
    Home
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
    <div class="main-container">
      <Header/>
<!--      <Headers />-->
      <router-view />
    </div>
    <Modal/>
  </main>
</template>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
  }

  .main-container {
    position: absolute;
    width: calc(100% - var(--sidebar-width));
    top: 0;
    left: var(--sidebar-width);
  }
</style>
