import { UHttp } from "../utils/UHttp";
import { GlobalVars } from "../../vars/Urls";
import {Team} from "../types/Team";

export class TeamService {

    public async getAll(): Promise<Response> {
        return  await UHttp.get(`${GlobalVars.BASE_URL_API}teams`, UHttp.authHeaders())
    }

    public async add( data: Team): Promise<Response> {
        return  await UHttp.post(`${ GlobalVars.BASE_URL_API }teams`, { team: data }, UHttp.authHeaders())
    }

    public async update(teamId: number, data: Team): Promise<Response> {
        return  await UHttp.put(`${ GlobalVars.BASE_URL_API }teams/${ teamId }`, { team: data }, UHttp.authHeaders())
    }

    public async delete(teamId: number): Promise<Response> {
        return  await UHttp.delete(`${ GlobalVars.BASE_URL_API }teams/${teamId}`, UHttp.authHeaders())
    }

}
