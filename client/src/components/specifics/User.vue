<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({

  name: "User",

  data() {
    return {
      testUserCurrent: [{id:1, username:"john", email:'john@dmail.com'}]
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
      <router-link to="/">Users</router-link>
      <router-link to="/WorkingTimes">Working times</router-link>
    </div>
    <div class="user-current">
      <p>icon</p>
      <p>John Doe</p>
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