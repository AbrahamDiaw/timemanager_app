<script>

import {ROLES} from "../../../types/User";
import {reactive} from "vue";
import {UserStore} from "../../../stores/UserStore";

export default {
  name: "AddUser",

  setup() {
    const userState = reactive({
      username: "",
      email: "",
      role: ''
    })

    const roles = [
      ROLES.EMPLOYEE,
      ROLES.MANAGER,
      ROLES.GENERAL_MANAGER,
    ]

    return {
      userState,
      roles
    }
  },

  methods: {
    addUser() {
      UserStore((state) => state.add(this.userState))
    },
  }

}

</script>

<template>
  <form @submit.prevent="addUser" class="form">
      <div class="form-field-container">
          <div class="form-field">
              <input class="form-input" v-model="userState.username" type="text" placeholder="username">
          </div>

          <div class="form-field">
              <input class="form-input" v-model="userState.email" type="email" placeholder="email">
          </div>

        <select class="form-input" v-model="userState.role">
          <option disabled value="">Choisir un rôle</option>
          <option v-for="role in this.roles" :key="role">{{ role }}</option>
        </select>
      </div>

      <button class="form-button" type="submit">Submit</button>
  </form>
</template>

<style scoped>

</style>
