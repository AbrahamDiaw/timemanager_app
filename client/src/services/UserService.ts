import { User } from "../types/User.ts";
import { UHttp } from "../utils/UHttp.ts";
import { GlobalVars } from "../../vars/Global.ts";

export class UserService {
	
	public static async getById(userId: string): Promise<User> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public static async getByEmail(email: string): Promise<User> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users?email=${ email }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public static async add(data: User): Promise<User> {
		let user = await UHttp.post(
			`${ GlobalVars.BASE_URL_API }users`,
			{ user: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public static async updateById(userId: string, data: User): Promise<User> {
		let user = await UHttp.patch(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			{ user: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public static async delete(userId: string): Promise<User> {
		let user = await UHttp.delete(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
}