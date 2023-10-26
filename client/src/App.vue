<script  lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { mapGetters, mapActions } from "vuex";
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
    let payload = {
      id: "10",
      data: { status: false, time: "--heure" }
    };

    this.addByUserId(payload)

  }
}


</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  <HelloWorld msg="Vite + Vue"/>
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
