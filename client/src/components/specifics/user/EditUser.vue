<script lang="ts">

import { AuthUser, ROLES, User } from "../../../types/User";
import { UserStore } from "../../../stores/UserStore";
import { ModalStore } from "../../../stores/ModalStore";

type EditDataType = {
	newUser: User | AuthUser,
	disabled: boolean
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
				email: this.user.email,
				password: ''
			},
			disabled: false
		}
	},

	methods: {
		editUser(event: any) {
			event.preventDefault();

      this.disabled = true;

			UserStore((state) => {
          if (!this.user?.id) {
              return;
          }

          state.update(this.user.id, this.newUser, this.auth).finally(() => {
              this.disabled = false;
              ModalStore((state) => state.closeModal());
          });
			});
		}
	}

}

</script>

<template>
    <form @submit="editUser" class="form" v-if="user">
        <div class="form-field-container">
            <div class="form-field">
                <input class="form-input" v-model="newUser.username" type="text" placeholder="Username">
            </div>

            <div class="form-field">
                <input class="form-input" v-model="newUser.email" type="email" placeholder="Email">
            </div>

            <select class="form-input" v-model="newUser.role">
                <option disabled value="">Choisir un rôle</option>
                <option v-for="role in roles" :key="role">{{ role }}</option>
            </select>

            <div class="form-field">
                <input class="form-input" v-model="newUser.password" type="password" placeholder="Password">
            </div>
        </div>

        <button class="form-button" type="submit" :disabled="disabled">Submit</button>
    </form>
</template>

<style scoped>

</style>
