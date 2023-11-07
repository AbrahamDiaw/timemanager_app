<script lang="ts">
import EditUser from "./EditUser.vue";
import { UserStore } from "../../../stores/UserStore";

export default {
  name: "UserSettings",
  components: {
    EditUser
  },

  data() {
    return {
      authUser: UserStore(state => state.authUser)
    }
  },
}

</script>

<template>
  <h1>User Settings</h1>
  <EditUser :user="authUser" :auth="true"/>
</template>

<style scoped>

</style>