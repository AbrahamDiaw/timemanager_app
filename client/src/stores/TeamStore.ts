import { create } from "zustand-vue";
import {TeamService} from "../services/TeamService";
import {Team} from "../types/Team";

export type TeamState = {
    teams: Team[];
    currentTeam: Team | null;
    add: (team: Team) => void;
    getAll: () => Promise<void>;
    updateById: (teamId: string, data: Team) => void;
    deleteById: (teamId: string) => void;
    error: string | null;
}

const teamService = new TeamService()

export const TeamStore = create<TeamState>(
    (set) => ({
        teams:[],

        currentTeam: {
            name: ""
        },

        error: "",

        getAll: (): Promise<void> => {
            return new Promise((resolve, reject) => {
                teamService.getAll().then(async (response) => {
                    if(!response.ok) {
                        return;
                    }

                    const jsonResponse = await response.json();
                    const data = jsonResponse.data;

                    set({teams: data});
                }).finally(() => {
                    resolve();
                })
            })
        },

        add: (data: Team): void => {
            set(state => {
                const _teams = [...state.teams];
                _teams.push(data);
                return { teams: _teams }
            })
        },

        updateById: (teamId: string, data: Team): void => {

        },

        deleteById: (teamId: string): void => {

        }

    })
);
