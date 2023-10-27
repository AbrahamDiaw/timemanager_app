<script>

import { UserStore } from "../../../stores/UserStore";
import {Components} from "../../_components/Components";
import Modal from "../../generics/Modal.vue";
import {ModalStore} from "../../../stores/ModalStore";

export default {

  name: "Users",

  computed: {
      Modal() {
          return Modal
      },
      Components() {
          return Components
      }
  },

  data() {
    return {
      users: UserStore(state => state.users)
    }
  },

  methods: {
      ModalStore,
      UserStore,
    navigateToUser(userId) {
      this.$router.push(`/users/${userId}`);
    },
    addUser() {
    },
    editUser() {
      console.log("edit")
    },

    deleteUser() {
      console.log("delete")
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
        <button type="button" class="add-button" @click="() => ModalStore(state => state.openModal(Components.AddUser))">Add</button>
      </div>
    </div>
    <div class="table-container">
      <table>
        <thead class="bg-gray-50">
        <tr>
          <th scope="col" v-for="key in ['Email', 'Username', 'ID']" :key="key">{{ key }}</th>
          <th scope="col"><span></span></th>
          <th scope="col"><span></span></th>
        </tr>
        </thead>
        <tbody class="table-body-content">
        <tr v-for="user in users" :key="user.email">
          <td @click="navigateToUser(user.id)">{{ user.email }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.id }}</td>
          <button type="button" class="edit-button" @click="editUser()">Edit</button>
          <button type="button" class="delete-button" @click="deleteUser()">Delete</button>
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