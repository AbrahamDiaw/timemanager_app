<script>

import {Routes} from "../../../vars/Routes";
import Icon from "../generics/Icon/Icon.vue";
import {Icons} from "../generics/Icon/Icons";
import {ModalStore} from "../../stores/ModalStore";
import {Components} from "../_components/Components";

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
    components: {Icon},

    data() {
        return {
            isOpen: true,
            testUserCurrent: {id: 1, username: "john doe", email: 'john@dmail.com'},
            Routes: Routes,
            Icons: Icons
        }
    },

    methods: {
        ModalStore,
        setIsOpen(isOpen) {
            this.isOpen = isOpen;
        }

    },

    mounted() {
        console.log(`Component User(Sidebar).`)
    }

}
</script>

<template>
    <div :class="'sidebar-container' + (!isOpen ? ' sidebar-close' : '')">
        <div class="close-icon" @click="() => setIsOpen(!isOpen)">
            <Icon :name="isOpen ? Icons.IconArrowLeft : Icons.IconArrowRight"/>
        </div>

        <div class="sidebar-content-container">
            <div class="sidebar-header">
                <div class="sidebar-header-icons">
                    <Icon :name="Icons.IconAccountCircle"/>
                    <Icon v-if="isOpen" :name="Icons.IconSettings" @click="() => ModalStore(state => state.openModal(Components.UserSettings))" />
                </div>
                <p v-if="isOpen"> Hi {{ testUserCurrent.username }} !</p>
            </div>

            <div class="sidebar-content-wrapper">
                <div class="sidebar-content">
                    <router-link :to="{ path: Routes.HOME }">
                        <Icon :name="Icons.IconUsers"/>
                        <span v-if="isOpen">Users</span>
                    </router-link>
                    <router-link :to="{ path: Routes.WORKINGTIMES + '/' + testUserCurrent.id}">
                        <Icon :name="Icons.IconAlarms"/>
                        <span v-if="isOpen">Working times</span>
                    </router-link>
                </div>
            </div>

            <div class="sidebar-footer">
                <a>
                    <Icon :name="Icons.IconLogoutCircle"/>
                    <span v-if="isOpen">Log out</span>
                </a>
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
    height: 100vh;
    background: #F8F9FD;
    transition: width 300ms ease;
    z-index: 10;
}

.sidebar-close {
    width: 60px !important;
}

.close-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    border-radius: 50%;
    top: 22px;
    right: -12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #222222;
    color: #FAFAFA;
    font-size: .65rem;
    cursor: pointer;
    z-index: 30;
}

.close-icon:hover {
    background: #000000;
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

.sidebar-header p {
    margin-top: 15px;
    font-size: 1rem;
}

.sidebar-header-icons {

}

.sidebar-header-icons i:first-child {
    cursor: auto;
    font-size: 2.5rem;
    color: #000;
}

.sidebar-header-icons i {
    font-size: .9rem;
    cursor: pointer;
    color: grey;
}

.sidebar-header-icons i:hover {
    color: #000000;
}

.sidebar-content-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin: 15px auto;
}

.sidebar-content-wrapper a {
    color: #222222;
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
    padding: 25px 0;
}

.sidebar-footer a {
    display: flex;
    align-items: center;
    cursor: pointer;
}

</style>