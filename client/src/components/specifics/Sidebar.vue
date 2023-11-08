<script lang="ts">

import { Routes } from "../../../vars/Routes";
import Icon from "../generics/Icon/Icon.vue";
import { Icons } from "../generics/Icon/Icons";
import { ModalStore } from "../../stores/ModalStore";
import { Components } from "../_components/Components";
import { UserStore } from "../../stores/UserStore";
import { SecurityService } from "../../services/SecurityService";
import { AuthUser } from "../../types/User";

const securityService = new SecurityService()

export default {

	name: "Sidebar",

	computed: {
		Components() {
			return Components
		},
		Icon() {
			return Icon
		}
	},

	components: { Icon },

	data() {
		return {
			isOpen: true,
			Routes: Routes,
			Icons: Icons,
			authUser: UserStore((state) => state.authUser) as AuthUser
		}
	},

	methods: {
		ModalStore,
		setIsOpen(isOpen: boolean) {
			this.isOpen = isOpen;
		},
		handleSignOut() {
			securityService.signOut()
		}
	},

	mounted() {
		UserStore((state) => state.findAll())
	}

}

</script>

<template>
    <div :class="'sidebar-container' + (!isOpen ? ' sidebar-close' : '')">
        <div class="close-icon" @click="() => setIsOpen(!isOpen)">
            <Icon :name="isOpen ? Icons.IconArrowLeft : Icons.IconArrowRight"/>
        </div>

        <div class="sidebar-content-container" v-if="authUser">
            <div class="sidebar-header">
                <div>
                    <Icon :name="Icons.IconAccountCircle" class-name="sidebar-header-account"/>
                    <Icon class-name="sidebar-header-settings" v-if="isOpen" :name="Icons.IconSettings"
                          @click="() => ModalStore(state => state.openModal(Components.UserSettings))"/>
                </div>
                <div class="sidebar-header-username">
                    <p v-if="isOpen"> Hi {{ authUser?.username }} !</p>
                </div>
            </div>

            <div class="sidebar-content-wrapper">
                <div class="sidebar-content">
                    <router-link :to="{ path: Routes.DASHBOARD }">
                        <Icon :name="Icons.IconDashboard"/>
                        <span v-if="isOpen">Dashboard</span>
                    </router-link>
                    <router-link :to="{ path: Routes.USERS }">
                        <Icon :name="Icons.IconUsers"/>
                        <span v-if="isOpen">Users</span>
                    </router-link>
                    <router-link :to="{ path: Routes.WORKINGTIMES + '/' + authUser.id}">
                        <Icon :name="Icons.IconAlarms"/>
                        <span v-if="isOpen">My Working times</span>
                    </router-link>
                    <router-link :to="{ path: Routes.CLOCK_MANAGER + '/' + authUser.username}">
                        <Icon :name="Icons.IconAlarms"/>
                        <span v-if="isOpen">My Clock</span>
                    </router-link>
                    <router-link :to="{ path: Routes.TEAMS}">
                        <Icon :name="Icons.IconAlarms"/>
                        <span v-if="isOpen">Teams</span>
                    </router-link>
                </div>
            </div>

            <div class="sidebar-footer">
                <Icon @click="handleSignOut" class-name="logout-btn" :name="Icons.IconPowerOff"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

.sidebar-container {
    position: sticky;
    top: 0;
    left: 0;
    width: var(--sidebar-width);
    min-width: var(--sidebar-width);
    height: 100vh;
    transition: width 300ms ease;
    z-index: 10;
    color: #FFFFFF;
    border-right: 1px solid var(--grey);
}

.sidebar-close {
    width: 60px !important;
    min-width: 60px !important;
}

.close-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 50%;
    top: 22px;
    right: -16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-dark-color);
    font-size: .65rem;
    cursor: pointer;
    border: 1px solid var(--grey);
    z-index: 30;
}

.close-icon:hover {
    background: #FFFFFF;
    color: #000000;
}

.sidebar-content-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
}

.sidebar-header {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.sidebar-header-account {
    cursor: auto;
    font-size: 3rem;
    color: var(--white);
}

.sidebar-close .sidebar-header-account {
    font-size: 2rem;
}

.sidebar-header-settings {
    font-size: .9rem;
    cursor: pointer;
    color: var(--light-grey);
}

.sidebar-header-settings:hover {
    color: #FFFFFF;
}

.sidebar-header-username {
    width: 80%;
    margin-top: 15px;
    font-size: 1rem;
    word-break: break-all;
    text-align: center;
}

.sidebar-content-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin: 15px auto;
}

.sidebar-content-wrapper a {
    color: var(--white);
    text-decoration: none;
    font-size: .95rem;
    width: 60%;
    margin: 25px auto;
    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: nowrap;
}

.sidebar-close .sidebar-content-wrapper a {
    justify-content: center;
}

.sidebar-content i, .sidebar-footer i {
    font-size: 1.4rem;
}

.sidebar-content span, .sidebar-footer span {
    margin-left: 10px;
}

.sidebar-footer {
    padding: 30px 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logout-btn {
    cursor: pointer;
    font-size: 1.8rem;
    color: var(--light-grey);
}


.logout-btn:hover {
    color: var(--white);
}

</style>
