<script lang="ts">

import { UserStore } from "../../../stores/UserStore";
import { ModalStore } from "../../../stores/ModalStore";
import { Components } from "../../_components/Components";
import { Routes } from "../../../../vars/Routes";
import { User } from "../../../types/User";

export default {

  name: "Users",

  data() {
    return {
      users: UserStore(state => state.users),
      authUser: UserStore(state => state.authUser),
      currentUser: UserStore(state => state.currentUser)
    }
  },

  methods: {
    navigateToCurrentUser(userId: string) {
      this.$router.push(`${ Routes.WORKINGTIMES }/${ userId }`);
    },
    addUser() {
      ModalStore((state) => state.openModal(Components.AddUser));
    },
    editUser(user: User) {
      ModalStore((state) => state.openModal(Components.EditUser, { user }));
    },

    deleteUser(userId: string) {
      UserStore(state => state.deleteById(userId));
    }
  },

}

</script>

<template>
  <div>
    <div class="header-button">
      <div class="header-content">
        <button type="button" class="add-button" @click="addUser()">Add</button>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead class="bg-gray-50">
        <tr>
          <th scope="col" v-for="key in ['ID', 'Email', 'Username', 'Role']" :key="key">{{ key }}</th>
          <th scope="col"><span></span></th>
          <th scope="col"><span></span></th>
        </tr>
        </thead>
        <tbody class="table-body-content">
        <tr v-for="user in users" :key="user.email">
          <td @click="navigateToCurrentUser(user.id as string)">{{ user.id }}</td>
          <td @click="navigateToCurrentUser(user.id as string)">{{ user.email }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <button type="button" class="edit-button" @click="editUser(user)">Edit</button>
          <button type="button" class="delete-button" @click="deleteUser(user.id)">Delete</button>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped>


</style>
