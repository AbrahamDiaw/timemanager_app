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
	public static post(url: string, data: any, headers: any = {}): Promise<Response> {
		return fetch(url, {
			method: "POST",
			body: data,
			headers
		});
	}

	public static get(url: string, headers: any = {}): Promise<Response> {
		console.log("url", url)
		return fetch(url, {
			method: "GET",
			headers
		});
	}
	
	public static patch(url: string, data: any, headers: any = {}): Promise<Response> {
		return fetch(url, {
			method: "PATCH",
			body: data,
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
			'Content-Type': 'application/json'
		}
	}

}