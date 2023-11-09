<script lang="ts">
import Users from "../specifics/user/Users.vue";
import WorkingTimes from "../pages/WorkingTimes.vue"
import { UserStore } from "../../stores/UserStore";

export default {
  name: "Home",
  components: {
    Users,
    WorkingTimes
  },

  data() {
    return {
      currentUser: UserStore(state => state.currentUser),
    }
  },
}
</script>


<template>
  <div class="home-container">
    <Users/>
  </div>
</template>

<style scoped>

</style>
