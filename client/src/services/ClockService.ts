import {Clock} from "../types/Clock.ts"
import {UHttp as UHttp} from "../utils/UHttp.ts";
import {GlobalVars} from "../../vars/Global.ts";


export class ClockService {
	public static async postNewClock(userId: string, data: Clock): Promise<void> {
		let res = await UHttp.post(`${GlobalVars.BASE_URL_API}clocks/${userId}`,data, UHttp.defaultHeaders())
		let response = await res.json();
		return  response.data
	}

	public static async getClockByUserId(userId: string): Promise<Clock> {
		let res = await UHttp.get(`${GlobalVars.BASE_URL_API}clocks/${userId}`, UHttp.defaultHeaders())
		let response = await res.json();
		return  response.data
	}
}