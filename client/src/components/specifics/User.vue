<script lang="ts">
import { defineComponent } from 'vue'
import {Routes} from "../../../vars/Routes";

export default defineComponent({

  name: "User",
  computed: {
    Routes() {
      return Routes
    }

  },

  data() {
    return {
      testUserCurrent: {id:1, username:"john doe", email:'john@dmail.com'},
    }
  },

  mounted() {
    console.log(`Component User(Sidebar).`)
  }

})
</script>

<template>
  <div class="sidebar-container">
    <div class="sidebar-navigation">
      <router-link :to="{path: Routes.HOME }">Users</router-link>
      <router-link :to="{path: Routes.WORKINGTIMES+ '/' + testUserCurrent.id}">Working times</router-link>
    </div>
    <div class="user-current" >
      <p>icon</p>
      <p>{{testUserCurrent.username}}</p>
    </div>
  </div>
</template>

<style scoped>

.sidebar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100%;
  background: grey;

}
.sidebar-navigation {
  display: flex;
  flex-direction: column;
}
.user-current {
  display: flex;
  padding: 10px 5px;
}
.user-current > p:last-child {
  margin-left: 15px;
}


</style>