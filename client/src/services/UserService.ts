import { AuthUser, User } from "../types/User";
import { UHttp } from "../utils/UHttp";
import { GlobalVars } from "../../vars/Urls";

export class UserService {

	public async getAll(): Promise<User[]> {
		const response = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users`,
			UHttp.authHeaders()
		)

		const jsonResponse = await response.json();

		return jsonResponse.data;
	}

	public async getById(userId: string): Promise<User> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			UHttp.authHeaders()
		)

		let response = await user.json();

		return response.data

	}

	public async getByEmail(email: string): Promise<User> {
		let user = await UHttp.get(
			`${ GlobalVars.BASE_URL_API }users?email=${ email }`,
			UHttp.authHeaders()
		)

		let response = await user.json();

		return response.data

	}

	public async add(data: User): Promise<User> {
		let response = await UHttp.post(
			`${ GlobalVars.BASE_URL_API }users`,
			{ user: data },
			UHttp.authHeaders()
		)

		let user = await response.json();

		return user.data
	}

	public async update(data: AuthUser | User): Promise<Response> {
		return  await UHttp.patch(
			`${ GlobalVars.BASE_URL_API }users/${ data.id }`,
			{ user: data },
			UHttp.authHeaders()
		);
	}

	public async deleteById(userId: string): Promise<boolean> {
		let response = await UHttp.delete(
			`${ GlobalVars.BASE_URL_API }users/${ userId }`,
			UHttp.authHeaders()
		)


		return response.ok

	}

}
