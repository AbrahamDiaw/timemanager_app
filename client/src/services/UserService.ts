import { User } from "../types/User.ts";
import { UHttp } from "../utils/UHttp.ts";
import { GlobalVars } from "../../vars/Global.ts";

export class UserService {
	
	public static async getUserById(userId: string): Promise<User> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public static async getUserByEmail(email: string): Promise<User> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users?email=${ email }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public static async addUser(data: any): Promise<User> {
		let user = await UHttp.post(
			`${ GlobalVars.BASE_URL_API }users`,
			{ user: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public static async updateUser(data: any): Promise<User> {
		let user = await UHttp.patch(
			`${ GlobalVars.BASE_URL_API }users`,
			{ user: data },
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
	public static async deleteUser(userId: string): Promise<User> {
		let user = await UHttp.delete(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			UHttp.defaultHeaders()
		)
		
		let response = await user.json();
		
		return response.data
		
	}
	
}