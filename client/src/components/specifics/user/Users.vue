<script>

import { UserStore } from "../../../stores/UserStore";
import {ModalStore} from "../../../stores/ModalStore";
import {Components} from "../../_components/Components";

export default {

  name: "Users",

  data() {
    return {
      users: UserStore(state => state.users)
    }
  },

  methods: {
    navigateToUser(userId) {
      this.$router.push(`/users/${userId}`);
    },

    addUser() {
     ModalStore((state) => state.openModal(Components.AddUser));
    },

    editUser(userId) {
      UserStore(state => state.findById(userId));
      ModalStore((state) => state.openModal(Components.EditUser));
    },

    deleteUser(userId) {
      UserStore(state => state.deleteById(userId));
    }
  },

  mounted() {
      UserStore(state => state.findAll());
  }

}

</script>

<template>
  <div class="users-container">
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
          <td @click="navigateToUser(user.id)">{{ user.id }}</td>
          <td @click="navigateToUser(user.id)">{{ user.email }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.role }}</td>
          <button type="button" class="edit-button" @click="editUser(user.id)">Edit</button>
          <button type="button" class="delete-button" @click="deleteUser(user.id)">Delete</button>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<style scoped>

.table-body-content {
  cursor: pointer;
}

</style>