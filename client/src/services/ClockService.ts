import {Clock} from "../types/Clock"
import {UHttp as UHttp} from "../utils/UHttp";
import {GlobalVars} from "../../vars/Urls";


export class ClockService {

	public async add(userId: string): Promise<Response> {
		return await UHttp.post(
			`${GlobalVars.BASE_URL_API}clocks/${userId}`
		);
	}

	public async get(userId: string): Promise<Response> {
		return await UHttp.get(`${GlobalVars.BASE_URL_API}clocks/${userId}`, UHttp.defaultHeaders());
	}

}