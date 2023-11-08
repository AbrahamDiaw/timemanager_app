import { WorkingTime } from "../types/WorkingTime";
import { UHttp } from "../utils/UHttp";
import { GlobalVars } from "../../vars/Urls";

export class WorkingTimeService {
	public async getByUserId(workingTime: WorkingTime): Promise<Response> {
		return  await UHttp.get(`${GlobalVars.BASE_URL_API}workingtimes/${workingTime.id}?start=${workingTime.start}Z&end=${workingTime.end}Z`, UHttp.authHeaders())
	}
	
	public async getByUserIdAndId(userId: string, workingTimeId: string): Promise<Response> {
		return  await UHttp.get(`${ GlobalVars.BASE_URL_API }workingtimes/${ userId }/${ workingTimeId }`, UHttp.authHeaders())
	}
	
	public async addByUserId( data: WorkingTime): Promise<Response> {
		return  await UHttp.post(`${ GlobalVars.BASE_URL_API }workingtimes/${ data.id }`, { workingtime: data }, UHttp.authHeaders())
	}
	
	public async updateById(workingTimeId: number, data: WorkingTime): Promise<Response> {
		return  await UHttp.put(`${ GlobalVars.BASE_URL_API }workingtimes/${ workingTimeId }`, { workingtime: data }, UHttp.authHeaders())
	}
	
	public async deleteById(workingTimeId: string): Promise<Response> {
		return  await UHttp.delete(`${ GlobalVars.BASE_URL_API }workingtimes/${workingTimeId}`, UHttp.authHeaders())
	}
}
