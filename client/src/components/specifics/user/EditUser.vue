<script lang="ts">

import { ROLES, User } from "../../../types/User";
import { UserStore } from "../../../stores/UserStore";

export default {
  name: "EditUser",


  setup() {
    const roles = Object.values(ROLES)

    return {
      roles
    }
  },


  data(): any {
    let currentUser: User | undefined;

    return {
      currentUser
    }
  },

  methods: {
    editUser() {
      UserStore((state) => state.updateById(this.currentUser.id, this.currentUser))
    },
  },

  mounted() {
    UserStore((state) => this.currentUser = state.currentUser)
  }

}

</script>

<template>
  <form @submit.prevent="editUser" class="form-container" v-if="currentUser">
    <h1>Edit User <span>{{ currentUser.username }}</span></h1>
    <input v-model="currentUser.username" type="text" placeholder="username">
    <input v-model="currentUser.email" type="text" placeholder="email">
    <select v-model="currentUser.role">
      <option disabled value="">Choisir un rôle</option>
      <option v-for="role in roles" :key="role">{{ role }}</option>
    </select>
    <input type="submit" value="Submit">
  </form>
</template>

<style scoped>

</style>