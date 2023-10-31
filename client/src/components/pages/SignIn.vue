<script lang="ts">

import { UserStore } from "../../stores/UserStore";
import { AuthTokenData, SecurityService } from "../../services/SecurityService";

const securityService = new SecurityService();

export default {
  name: "SignIn",


  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    handleSignIn(event: any) {
      event.preventDefault();

      securityService.signIn({ email: this.email, password: this.password })
        .then(async (res) => {
          if (!res.ok) {
            return
          }

          const jsonResponse = await res.json();

          if (jsonResponse.jwt) {
            securityService.storeToken(jsonResponse.jwt);
            window.location.reload()
          }
        }).catch(error => {
        console.error(error);
      });
    },
  },
}
</script>

<template>
  <form @submit.prevent="handleSignIn" class="form-container sign_in">
    <h1>Se connecter</h1>
    <input v-model="email" type="email" placeholder="example@epitech.eu">
    <input v-model="password" type="password" placeholder="password">

    <input type="submit" value="Submit">
  </form>
</template>

<style scoped>
form h1 {
  padding-bottom: 5px;
  text-align: center;
}

.sign_in {
  width: 40%;
}

.sign_in input {
  height: 50px;
  padding: 5px;
  font-size: 16px;
}

.sign_in input[type="submit"] {
  cursor: pointer;
}

</style>