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
      error: false,
      disabled: false
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

      this.disabled = true;

      const email = this.email.trim();
      const password = this.password.trim();

        this.error = email.length == 0 && password.length == 0;

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
      ).finally(() => {
            this.disabled = false;
        });
    },
  },
}
</script>

<template>
    <div class="sign-in-container">
        <form @submit="handleSignIn" class="form sign-in-form">
            <h1 class="form-title">Se connecter</h1>

            <div class="form-field-container sign-in-form-field-container">
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

            <button class="form-button" :disabled="disabled">Submit</button>
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
    background: url("/assets/images/batman-arkham-knight-wallpapers.jpg") hsl(208, 33%, 21%) no-repeat center center fixed;
    background-size: cover;
}

.sign-in-form {
    width: 80%;
    margin-top: -30px;
    max-width: 400px;
    padding: 42px;
    background: radial-gradient(60% 17% at 50% -2%, hsl(191, 71%, 76%) 0%, transparent 100%) no-repeat, 0 0 / 75% 100%,
    radial-gradient(60% 17% at 50% 102%, hsl(191, 71%, 76%) 0%, transparent 100%) no-repeat, 0 0 / 75% 100%,
    linear-gradient(rgba(94, 100, 111, 0.25) 3px, transparent 3px) 8px 4px /16px 16px,
    linear-gradient(to right, rgba(94, 100, 111, 0.25) 3px, transparent 3px) 8px 4px / 16px 16px, rgba(43, 44, 43, 0.75);
    border-bottom: 2px solid rgb(176, 229, 251);
    border-top: 2px solid rgb(176, 229, 251);
}

.sign-in-form-field-container {
    margin-top: 15px;
}

</style>
