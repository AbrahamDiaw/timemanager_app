<script>

import {ModalStore} from "../../../stores/ModalStore";
import {Components} from "../../_components/Components";
import AddUser from "../../specifics/user/AddUser.vue";
import EditUser from "../../specifics/user/EditUser.vue";
import EditWorkingTime from "../../specifics/workingtime/EditWorkingTime.vue"
import AddWorkingTime from "../../specifics/workingtime/AddWorkingTime.vue";
import {Icons} from "../Icon/Icons";
import Icon from "../Icon/Icon.vue";
import UserSettings from "../../specifics/user/UserSettings.vue";
import AddTeam from "../../specifics/team/AddTeam.vue";
import TeamUsers from "../../specifics/team/TeamUsers.vue";

export default {
    props: {
        title: String
    },

    components: {Icon},

    computed: {
        Icons() {
            return Icons
        }
    },

    data() {
        return {
            isOpen: ModalStore((state) => state.isOpen),
            props: undefined,
            title: ''
        };
    },

    methods: {
        ModalStore,

        create() {
            let comp;
            let composantName;

            ModalStore((state) => {
                composantName = state.componentName
                this.props = state.componentProps
            });

            this.title = '';

            switch (composantName) {
                case Components.AddUser:
                    comp = AddUser;
                    break;
                case Components.EditUser:
                    this.title = "Edit user";
                    comp = EditUser;
                    break;
                case Components.UserSettings:
                    this.title = "User Settings";
                    comp = UserSettings;
                    break;
                case Components.EditWorkingTime:
                    comp = EditWorkingTime;
                    break;
                case Components.AddWorkingTime:
                    comp = AddWorkingTime;
                    break;
                case Components.AddTeam:
                    this.title = "Add team";
                    comp = AddTeam;
                    break;
                case Components.TeamUsers:
                    this.title = "Users";
                    comp = TeamUsers;
                    break;
            }

            return comp;
        },

        closeModalOnBackgroundClick() {
            ModalStore((state) => state.closeModal());
        },

        preventModalClose(event) {
            event.stopPropagation();
        }
    }

}

</script>

<template>
    <div class="modal-background" v-if="isOpen" @pointerdown="closeModalOnBackgroundClick">
        <div class="modal small" @pointerdown="preventModalClose">
            <div class="header">
                <h2 class="title">{{ title }}</h2>
                <Icon :name="Icons.IconClose" class-name="cursor-pointer close-button"
                      :on-click="() => ModalStore(state => state.closeModal())"/>
            </div>

            <div class="content">
                <component :is="create()" v-bind="props"/>
            </div>

            <div class="footer">
            </div>
        </div>
    </div>
</template>

<style scoped>

.modal-background {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.modal {
    padding: 40px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    overflow: auto;
    background: #f8f6f6
}

.modal::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

.modal::-webkit-scrollbar-track {
    margin: 15px 0;
    -webkit-border-radius: 30px;
    border-radius: 30px;
}

.modal::-webkit-scrollbar-thumb {
    -webkit-border-radius: 30px;
    border-radius: 30px;
}

.modal::-webkit-scrollbar-thumb, .modal::-webkit-scrollbar-corner {
    background: lightgrey;
}

.modal::-webkit-scrollbar-thumb:hover, .modal::-webkit-scrollbar-corner:hover {
    background: darkgray;
}

.small, .medium, .large {
    max-height: 90%;
}

.small {
    width: 70%;
}

.medium {
    width: 80%;
}

.large {
    width: 90%;
}

.zoomIn {
    animation: zoom-in .3s;
}

.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    font-family: TT Ramillas Regular, sans-serif !important;
    font-size: 1.5rem;
    font-weight: bold;
    max-width: 90%;
    color: var(--dark-grey);
}

.title span:first-child {
    font-weight: normal;
}

.close-button {
    align-self: start;
    color: var(--light-grey);
    font-size: 1.2rem !important;
}

.close-button:hover {
    color: var(--dark-grey);
}

.content {
    width: 100%;
}


.footer {

}

@media (min-width: 601px) {

    .small {
        width: 500px;
    }

}

@media (min-width: 1024px) {

    .medium {
        width: 800px;
    }

}

@media (min-width: 2048px) {

    .large {
        width: 1800px;
    }

}

@keyframes zoom-in {
    from {
        transform: scale(0)
    }
    to {
        transform: scale(1)
    }
}

</style>
