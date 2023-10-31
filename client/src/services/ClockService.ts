import {Clock} from "../types/Clock"
import {UHttp as UHttp} from "../utils/UHttp";
import {GlobalVars} from "../../vars/Urls";


export class ClockService {

	public async addByUserId(userId: string, data: Clock): Promise<void> {
		let response = await UHttp.post(
			`${GlobalVars.BASE_URL_API}clocks/${userId}`,
			{ clock: data },
			UHttp.defaultHeaders()
		);

		let jsonResponse = await response.json();

		return  jsonResponse.data
	}

	public async getClockByUserId(userId: string): Promise<Clock> {
		let response = await UHttp.get(`${GlobalVars.BASE_URL_API}clocks/${userId}`, UHttp.defaultHeaders())
		let jsonResponse = await response.json();
		return  jsonResponse.data
	}

}