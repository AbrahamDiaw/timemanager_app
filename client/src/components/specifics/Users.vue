<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Users",

  data() {
    return {
      people: [
        {
          email: 'lindsay.walton@example.com',
          username: 'Lindsay Walton',
          role: 'Employee'
        }
      ],
      userStore: this.$store.state.User
    }
  },

  methods: {
    navigateToUser(userId) {
      this.$router.push(`/users/${userId}`);
    },
    addUser() {
      this.$store.dispatch("addNewUser")
    },
    editUser() {
      console.log("edit")
    },

    deleteUser() {
      console.log("delete")
    }
  },

  computed: {},

  mounted() {
    this.$store.dispatch("getAllUsers")
  }
})

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
          <th scope="col" v-for="key in ['Email', 'Username', 'ID']" :key="key">{{ key }}</th>
          <th scope="col"><span></span></th>
          <th scope="col"><span></span></th>
        </tr>
        </thead>
        <tbody class="table-body-content">
        <tr v-for="user in userStore.users" :key="user.email">
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