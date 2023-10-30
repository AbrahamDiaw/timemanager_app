import { WorkingTime } from "../types/WorkingTime";
import { UHttp } from "../utils/UHttp";
import { GlobalVars } from "../../vars/Urls";

export class WorkingTimeService {
	public async getByUserId(workingTime: WorkingTime): Promise<WorkingTime[]> {
		let user = await UHttp.get(
			 `${GlobalVars.BASE_URL_API}workingtimes/${workingTime.id}?start=${workingTime.start}Z&end=${workingTime.end}Z`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
	}
	
	public async getByUserIdAndId(userId: string, workingTimeId: string): Promise<WorkingTime> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }workingtimes/${ userId }/${ workingTimeId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
	}
	
	public async addByUserId(userId: string, data: WorkingTime): Promise<WorkingTime> {
		let user = await UHttp.post(
			`${ GlobalVars.BASE_URL_API }workingtimes/${ userId }`,
			{ workingtime: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
	}
	
	public async updateById(workingTimeId: string, data: WorkingTime): Promise<WorkingTime> {
		let user = await UHttp.patch(
			`${ GlobalVars.BASE_URL_API }workingtimes/${ workingTimeId }`,
			{ workingtime: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
	}
	
	public async deleteById(workingTimeId: string): Promise<boolean> {
		let response = await UHttp.delete(
			`${ GlobalVars.BASE_URL_API }workingtimes/${workingTimeId}`,
			UHttp.defaultHeaders()
		)
		return response.ok
	}
}