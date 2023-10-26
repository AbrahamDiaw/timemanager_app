<script  lang="ts">
import { mapGetters, mapActions } from "vuex";

import Home from "./components/pages/Home.vue"
import User from "./components/specifics/User.vue";
import Header from "./components/specifics/Header.vue";

export default {

  components: {
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
  </main>
</template>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
  }

  .main-container {
    position: absolute;
    width: 100%;
    top: 0;
    left: var(--sidebar-width);
  }
</style>
