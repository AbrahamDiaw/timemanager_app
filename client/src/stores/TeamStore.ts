import { create } from "zustand-vue";
import {TeamService} from "../services/TeamService";
import {Team} from "../types/Team";


export type TeamState = {
    teams: Team[];
    currentTeam: Team | null;
    add: (team: Team) => void;
    getAll: () => void;
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
        getAll: (): void => {
            teamService.getAll().then(async (response) => {
                if(!response.ok) {
                    return
                }
                const jsonResponse = await response.json();
                const data = jsonResponse.data;
                set({teams: data})
            })
        },
        add: (data: Team): void => {

        },
        updateById: (teamId: string, data: Team): void => {

        },
        deleteById: (teamId: string): void => {

        }
    }));