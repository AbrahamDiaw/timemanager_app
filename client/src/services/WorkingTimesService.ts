import { WorkingTimes } from "../types/WorkingTime.ts";
import { UHttp } from "../utils/UHttp.ts";
import { GlobalVars } from "../../vars/Global.ts";

export class WorkingTimesService {
	public static async getByUserId(userId: string): Promise<WorkingTimes> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }workingtimes/${ userId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
	}
	
	public static async getByUserIdAndId(userId: string, workingTimesId: string): Promise<WorkingTimes> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }workingtimes/${ userId }/${ workingTimesId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
	}
	
	public static async addByUserId(userId: string, data: WorkingTimes): Promise<WorkingTimes> {
		let user = await UHttp.post(
			`${ GlobalVars.BASE_URL_API }workingtimes/${ userId }`,
			{ workingtime: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
	}
	
	public static async updateById(workingTimesId: string, data: WorkingTimes): Promise<WorkingTimes> {
		let user = await UHttp.patch(
			`${ GlobalVars.BASE_URL_API }workingtimes/${ workingTimesId }`,
			{ workingtime: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
	}
	
	public static async deleteById(workingTimesId: string): Promise<WorkingTimes> {
		let user = await UHttp.delete(
			`${ GlobalVars.BASE_URL_API }workingtimes/${ workingTimesId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
	}
}