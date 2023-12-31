import { SecurityService } from "../services/SecurityService";

export enum HTTP_STATUS_CODE {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	UNPROCESSABLE_ENTITY = 422,
	INTERNAL_SERVER_ERROR = 500
}

export class UHttp {
	public static post(url: string, data: any = {}, headers: any = {}): Promise<Response> {
		return fetch(url, {
			method: "POST",
			body: JSON.stringify(data),
			headers
		});
	}

	public static get(url: string, headers: any = {}): Promise<Response> {
		return fetch(url, {
			method: "GET",
			headers
		});
	}
	
	public static patch(url: string, data: any, headers: any = {}): Promise<Response> {
		return fetch(url, {
			method: "PATCH",
			body: JSON.stringify(data),
			headers
		});
	}

	public static put(url: string, data: any, headers: any = {}): Promise<Response> {
		return fetch(url, {
			method: "PUT",
			body: JSON.stringify(data),
			headers
		});
	}
	
	public static delete(url: string, headers: any = {}): Promise<Response> {
		return fetch(url, {
			method: "DELETE",
			headers
		});
	}
	
	public static defaultHeaders(): { Accept: string; "Content-Type": string } {
		return {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
		}
	}
	
	public static authHeaders(): { Authorization: string; Accept: string; "Content-Type": string } {
		return {
			...this.defaultHeaders(),
			'Authorization': "Bearer " + SecurityService.getToken() as string
		}
	}

}