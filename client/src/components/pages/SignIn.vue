<script lang="ts">

import "../../styles/forms.css";
import { SecurityService } from "../../services/SecurityService";
import Icon from "../generics/Icon/Icon.vue";
import { Icons } from "../generics/Icon/Icons";

const securityService = new SecurityService();

export default {
  name: "SignIn",

	components: { Icon },

  data() {
    return {
      email: '',
      password: '',
      error: false
    }
  },

    computed: {
        Icons() {
            return Icons
        }
    },

    methods: {
    handleSignIn(event: any) {
      event.preventDefault();

      const email = this.email.trim();
      const password = this.password.trim();

        this.error = email.length > 0 && email.length > 0;

        securityService.signIn({ email, password })
        .then(async (res) => {
          if (!res.ok) {
              this.error = true;
              return;
          }

          const jsonResponse = await res.json();

          if (jsonResponse.jwt) {
            securityService.storeToken(jsonResponse.jwt);
            window.location.reload()
          }
        }).catch(error => {
            console.error(error);
        }
      );
    },
  },
}
</script>

<template>
    <div class="sign-in-container">
        <form @submit="handleSignIn" class="form sign-in-form">
            <h1 class="form-title">Se connecter</h1>

            <div class="form-field-container">
                <div class="form-field">
                    <input class="form-input" v-model="email" type="email" placeholder="Email">
                </div>

                <div class="form-field">
                    <input class="form-input" v-model="password" type="password" placeholder="Password">
                </div>
            </div>

            <div class="form-error-container" v-if="error">
                <p class="form-error"><Icon :name="Icons.IconDangerTriangle" />&nbsp;Invalid credentials !</p>
            </div>

            <button class="form-button">Submit</button>
        </form>
    </div>
</template>

<style scoped>

.sign-in-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -30px;
}

.sign-in-form {
    max-width: 400px;
    padding: 42px;
}

</style>
