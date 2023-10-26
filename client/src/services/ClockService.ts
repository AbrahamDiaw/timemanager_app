import {Clock} from "../types/Clock"
import {UHttp as UHttp} from "../utils/UHttp";
import {GlobalVars} from "../../vars/Global";


export class ClockService {
	public async addByUserId(userId: string, data: Clock): Promise<void> {
		let res = await UHttp.post(`${GlobalVars.BASE_URL_API}clocks/${userId}`,data, UHttp.defaultHeaders())
		let response = await res.json();
		return  response.data
	}

	public async getClockByUserId(userId: string): Promise<Clock> {
		let res = await UHttp.get(`${GlobalVars.BASE_URL_API}clocks/${userId}`, UHttp.defaultHeaders())
		let response = await res.json();
		return  response.data
	}
}