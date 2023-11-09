import { create } from "zustand-vue";
import {TeamService} from "../services/TeamService";
import {Team} from "../types/Team";

export type TeamState = {
    teams: Team[];
    add: (team: Team) => void;
    getAll: () => Promise<void>;
    update: (teamId: number, data: Team) => void;
    delete: (teamId: number) => void;
}

const teamService = new TeamService()

export const TeamStore = create<TeamState>(
    (set) => ({
        teams:[],

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

        update: (teamId: number, data: Team): void => {

        },

        delete: (teamId: number): void => {
            if (!teamId) {
                return;
            }

            set(state => {
                const _teams = [...state.teams]
                    .filter((team) => team.id != teamId);
                return { teams: _teams }
            })
        }

    })
);
