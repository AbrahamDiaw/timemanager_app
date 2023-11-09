<script lang="ts">

import { TeamStore } from "../../../stores/TeamStore";
import Icon from "../../generics/Icon/Icon.vue";
import { Icons } from "../../generics/Icon/Icons";
import { ModalStore } from "../../../stores/ModalStore";
import { Components } from "../../_components/Components";
import Loader from "../../generics/Loader/Loader.vue";
import { UserStore } from "../../../stores/UserStore";
import { AuthUser, ROLES } from "../../../types/User";
import { Team } from "../../../types/Team";

export default {
  name: "Teams",
  computed: {
	  ROLES() {
		  return ROLES
	  },
	  Components() {
		  return Components
	  },
    Icons() {
      return Icons
    }
  },
  components: { Loader, Icon},
  data() {
    return {
      authUser: UserStore(state => state.users) as AuthUser,
      teams: TeamStore(state => state.teams),
        loading: false
    }
  },
  methods: {
	    ModalStore,

      isMyTeam(teams: Team[], teamName): boolean {
        if (!teams) {
			    return false;
        }

			  for (const team of teams) {
				  if (team.name === teamName)
					  return true;
        }

			  return false;
      }

  },
  mounted() {
    TeamStore(state => {

		this.loading = state.teams.length == 0;

		state.getAll().finally(() => {
			this.loading = false;
    })
	})
  }
}
</script>
<template>
  <div class="teams">
    <div class="teams-header">
        <h1 class="teams-title">Teams</h1>
        <button type="button" class="teams-button" @click="ModalStore(state => state.openModal(Components.AddTeam))">Add</button>
    </div>

    <div class="teams-container">
        <div class=teams-loader v-if="loading">
            <Loader />
        </div>
        <div class="teams-content"  v-for="(team) in teams">
            <h2 class="teams-name">{{team.name}}</h2>
            <div class="teams-manage">
              <Icon :name="Icons.IconUsers" />
              <span v-if="authUser.role == ROLES.ADMIN || isMyTeam(authUser.teams, team.name)">
                  <Icon :name="Icons.IconEdit" />
                  <Icon :name="Icons.IconDelete" />
              </span>
            </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.teams {
    width: 100%;
    color: var(--white);
}

.teams-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 40px;
}

.teams-button {
    font-size: 1rem;
    padding: 5px 15px;
    border-radius: 10px;
    cursor: pointer;
}

.teams-button:hover {
    background: var(--white-hover);
}

.teams-title {
    font-size: 2rem;
}

.teams-container {
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
}

.teams-loader {
    margin: 15px;
}

.teams-content {
    background: var(--white);
    width: 150px;
    min-width: 150px;
    height: 90px;
    border-radius: 15px;
    padding: 15px;
    margin: 15px;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.teams-name {
    font-size: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.teams-manage {

}

.teams-manage i {
    margin: 0 5px;
    font-size: 1rem;
    cursor: pointer;
}

</style>
