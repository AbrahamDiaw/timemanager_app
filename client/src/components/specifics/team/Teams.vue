<script lang="ts">

import { TeamStore } from "../../../stores/TeamStore";
import Icon from "../../generics/Icon/Icon.vue";
import { Icons } from "../../generics/Icon/Icons";
import { ModalStore } from "../../../stores/ModalStore";
import { Components } from "../../_components/Components";
import Loader from "../../generics/Loader/Loader.vue";
import { UserStore } from "../../../stores/UserStore";
import { AuthUser, ROLES, User } from "../../../types/User";
import { Team } from "../../../types/Team";
import { TeamService } from "../../../services/TeamService";

const teamService = new TeamService();

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

	components: { Loader, Icon },

	data() {
		return {
			authUser: UserStore(state => state.authUser) as AuthUser,
			teams: TeamStore(state => state.teams),
			loading: false
		}
	},

	methods: {
      TeamStore,
		ModalStore,

		isMyTeam(team: Team): boolean {
			for (const user of team.users.data) {
				if (user.id == this.authUser.id)
					return true;
			}

			return false;
		},

		deleteTeam(team: Team) {
			if (team.id) {
				teamService.delete(team.id).then((response) => {
					if (response.ok) {
						TeamStore(state => {
							state.delete(team.id as number);
						});
					}
				});
			}
		},

    getUsers(team: any, teamUsers: any): void {
        const teamUserIds: number[] = [];
        const users = [];

        for (const user of teamUsers.data) {
            teamUserIds.push(user.id);
        }

        UserStore(state => {
            for (const user of state.users) {
                if (teamUserIds.includes(Number(user.id))) {
                    users.push(user);
                }
            }
        });

        TeamStore(state => {
            state.setCurrentTeam(team);
            state.setCurrentUsers(users);
        });
    }
	},

	mounted() {
		TeamStore(state => {
			this.loading = state.teams.length == 0;
			state.getAll().finally(() => {
				this.loading = false;
			});
		});
	}

}
</script>
<template>
    <div class="teams">
        <div class="teams-header">
            <h1 class="teams-title">Teams</h1>
            <button type="button" class="teams-button"
                    @click="ModalStore(state => state.openModal(Components.AddTeam))">Add
            </button>
        </div>

        <div class="teams-container">
            <div class=teams-loader v-if="loading">
                <Loader/>
            </div>
            <div class="teams-content" v-for="(team) in teams">
                <h2 class="teams-name">{{ team.name }}</h2>
                <div class="teams-manage">
                    <Icon v-if="team.users.data.length > 0" :name="Icons.IconUsers" @click="ModalStore(state => {state.openModal(Components.TeamUsers); getUsers(team, team.users)})" />
                    <span v-if="authUser.role == ROLES.ADMIN || isMyTeam(team)">
                  <Icon :name="Icons.IconEdit" @click="ModalStore(state => {
                      TeamStore(state => state.setCurrentTeam(team));
                      state.openModal(Components.EditTeam);
                  })"/>
                  <Icon :name="Icons.IconDelete" @click="deleteTeam(team)"/>
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
