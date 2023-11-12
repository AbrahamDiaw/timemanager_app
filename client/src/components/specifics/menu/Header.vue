<script lang="ts">
import {defineComponent, watch} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {Routes} from "../../../../vars/Routes";

type HeaderData = {
  title: string
};

export default {
  name: "Header",

  data(): HeaderData {
    return {
      title: ''
    }
  },

  methods: {
    autoSetTitle() {
      switch (location.pathname) {
        case Routes.HOME:
          this.title = "Home"
          break;
        case Routes.WORKINGTIMES:
          this.title = "Working Times"
          break;
      }
    }
  },

  mounted() {
    this.autoSetTitle();
    this.$watch( ()=> this.$route.path,(to, from)=> {
      this.autoSetTitle();
    })
  }

}

</script>

<template>
  <div class="header">
    <p class="header-title">{{ title }}</p>
  </div>
</template>

<style scoped>

.header {
  display: flex;
  align-items: center;
  height: 40px;
}

.header-title {
  padding: 5px;
}

</style>
