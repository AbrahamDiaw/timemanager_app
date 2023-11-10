<script>

import {Components} from "../../_components/Components";
import {Icons} from "../../generics/Icon/Icons";
import Icon from "../../generics/Icon/Icon.vue";
import {TeamStore} from "../../../stores/TeamStore";
import {TeamService} from "../../../services/TeamService";

const teamService = new TeamService();

export default {
    name: "TeamUsers",

    computed: {
        Components() {
            return Components
        },

        Icons() {
            return Icons
        }
    },

    components: {Icon},

    data() {
        return {
            team: TeamStore(state => state.currentTeam),
            users: TeamStore(state => state.currentUsers)
        }
    },

    methods: {
        deleteUser(user) {
            teamService.deleteMember(this.team.id, user.id).then((response) => {
                console.log(response);
            })
        }
    },

    mounted() {

    }
}

</script>

<template>
  <div class="teams-users">
      <p>{{ (users.value || '').length }}</p>
      <div class="teams-user" v-for="user of users">
          <p>{{ user.username }}</p>
          <Icon :name="Icons.IconDelete" class-name="delete-team-user" @click="deleteUser(user)" />
      </div>
  </div>
</template>

<style scoped>

.teams-users {
    margin: 25px 0;
}

.teams-user {
    border: 1px solid var(--light-grey);
    border-radius: 5px;
    margin: 25px 0 0 0;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.delete-team-user {
    cursor: pointer;
}

</style>
