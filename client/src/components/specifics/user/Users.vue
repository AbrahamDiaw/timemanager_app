<script lang="ts">

import { UserStore } from "../../../stores/UserStore";
import { ModalStore } from "../../../stores/ModalStore";
import { Components } from "../../_components/Components";
import { Routes } from "../../../../vars/Routes";
import { AuthUser, User } from "../../../types/User";
import Icon from "../../generics/Icon/Icon.vue";
import { Icons } from "../../generics/Icon/Icons";

import "../../../styles/tables.css";

export default {

	name: "Users",
    computed: {
        Icons() {
            return Icons
        }
    },
    components: { Icon },

	data() {
		return {
			users: UserStore(state => state.users) as User[],
			authUser: UserStore(state => state.authUser) as AuthUser,
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
    <div class="users">
        <div class="users-header">
            <button type="button" class="users-button" @click="addUser()">Add</button>
        </div>

        <div class="users-table">
            <table class="table">
                <thead class="">
                <tr>
                    <th scope="col" v-for="key in ['ID', 'Email', 'Username', 'Role']" :key="key">{{ key }}</th>
                </tr>
                </thead>
                <tbody class="table-body-content">
                <tr v-for="user in users" :key="user.email">
                    <td @click="navigateToCurrentUser(user.id as string)">{{ user.id }}</td>
                    <td @click="navigateToCurrentUser(user.id as string)">{{ user.email }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.role }}</td>
                    <td><Icon :name="Icons.IconEdit" @click="editUser(user)" /></td>
                    <td><Icon :name="Icons.IconDelete" class="delete-button" @click="deleteUser(user.id)" /></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<style scoped>

.users {
    width: 100%;
    color: var(--white);
    padding: 30px;
}

.users-header {
    display: flex;
    align-items: center;
    justify-content: end;
}

.users-button {
    font-size: 1rem;
    padding: 5px 15px;
    border-radius: 10px;
    cursor: pointer;
}

.users-button:hover {
    background: var(--white-hover);
}

.users-table {
    margin-top: 30px;
}

</style>
