<script lang="ts">

import { AuthUser, ROLES, User } from "../../../types/User";
import { UserStore } from "../../../stores/UserStore";
import { ModalStore } from "../../../stores/ModalStore";

type EditDataType = {
  newUser: User | AuthUser
}

export default {
  name: "EditUser",
  props: {
    user: null,
    auth: Boolean
  },

  setup() {
    const roles = Object.values(ROLES)

    return {
      roles
    }
  },

  data(): EditDataType {
    return {
      newUser: {
        id: this.user.id,
        role: this.user.role,
        username: this.user.username,
        email: this.user.email
      }
    }
  },

  methods: {
    editUser() {
      UserStore((state) => {
        if (this.auth) {
          state.updateAuthUser(this.user.id, this.newUser as AuthUser)
        } else {
          state.updateById(this.user.id, this.newUser as User)
        }
      })
      ModalStore((state) => state.closeModal())
    },
  },

}

</script>

<template>
  <form @submit.prevent="editUser" class="form-container" v-if="user">
    <input v-model="newUser.username" type="text" placeholder="username">
    <input v-model="newUser.email" type="email" placeholder="email">
    <select v-model="newUser.role">
      <option disabled value="">Choisir un rôle</option>
      <option v-for="role in roles" :key="role">{{ role }}</option>
    </select>
    <input type="submit" value="Submit">
  </form>
</template>

<style scoped>

</style>