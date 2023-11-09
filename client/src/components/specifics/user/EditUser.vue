<script lang="ts">

import { AuthUser, ROLES, User } from "../../../types/User";
import { UserStore } from "../../../stores/UserStore";
import { ModalStore } from "../../../stores/ModalStore";
import Icon from "../../generics/Icon/Icon.vue";
import { Icons } from "../../generics/Icon/Icons";

type EditDataType = {
  authUser: AuthUser;
	newUser: User | AuthUser;
	disabled: boolean;
    errors: Map<string, string[]>;
}

export default {
	name: "EditUser",
    computed: {
        ROLES() {
            return ROLES
        },
        Icons() {
            return Icons
        }
    },
    components: { Icon },
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
      authUser: UserStore(state => state.authUser) as AuthUser,
			newUser: {
				id: this.user.id,
				role: this.user.role,
				username: this.user.username,
				email: this.user.email,
				password: undefined
			},
			disabled: false,
        errors: new Map()
		}
	},

	methods: {
		editUser(event: any) {
			event.preventDefault();

      this.disabled = true;

			UserStore((state) => {
          if (!this.user?.id) {
              this.disabled = false;
              return;
          }

          this.errors.clear();

          state.update(this.newUser, this.auth).then(() => {
              ModalStore((state) => state.closeModal());
          }).catch((errors) => {
              if (errors) {
                  for (const [attr, errs] of Object.entries(errors)) {
                      this.errors.set(attr, errs);
                  }
              }
          }).finally(() => {
              this.disabled = false;
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

            <select class="form-input" v-model="newUser.role" v-if="authUser.role == ROLES.ADMIN || authUser.role == ROLES.GENERAL_MANAGER || authUser.role == ROLES.MANAGER">
                <option disabled value="Role">Role</option>
                <option v-for="role in roles.filter((r) => (authUser.role != ROLES.ADMIN) ? (authUser.role == ROLES.MANAGER) ? r != ROLES.GENERAL_MANAGER && r != ROLES.ADMIN : r != ROLES.ADMIN : true)" :key="role">{{ role }}</option>
            </select>

            <div class="form-field">
                <input class="form-input" v-model="newUser.password" type="password" placeholder="Password">
            </div>
        </div>

        <div class="form-error-container" v-if="errors">
            <div class="form-error" v-for="[attr, errs] in errors">
                <p><Icon :name="Icons.IconDangerTriangle" />&nbsp;{{ attr }}</p>
                <p v-for="err in errs">{{ err }}</p>
            </div>
        </div>

        <button class="form-button" type="submit" :disabled="disabled">Submit</button>
    </form>
</template>

<style scoped>

</style>
