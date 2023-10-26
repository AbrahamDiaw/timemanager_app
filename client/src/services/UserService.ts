import { User } from "../types/User";
import { UHttp } from "../utils/UHttp";
import { GlobalVars } from "../../vars/Urls";

export class UserService {
	
	public async getAll(): Promise<User[]> {
		const response = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users`,
			UHttp.defaultHeaders()
		)

		const jsonResponse = await response.json();
		
		return jsonResponse.data;
	}
	
	public async getById(userId: string): Promise<User> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public async getByEmail(email: string): Promise<User> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users?email=${ email }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public async add(data: User): Promise<User> {
		let user = await UHttp.post(
			`${ GlobalVars.BASE_URL_API }users`,
			{ user: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public async updateById(userId: string, data: User): Promise<User> {
		let user = await UHttp.patch(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			{ user: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public async deleteById(userId: string): Promise<User> {
		let user = await UHttp.delete(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
}