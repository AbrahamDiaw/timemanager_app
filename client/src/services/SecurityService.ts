import { UHttp } from "../utils/UHttp";
import { GlobalVars } from "../../vars/Urls";
import Cookies from "js-cookie";

export type AuthTokenData = {
	"aud": string,
	"exp": number,
	"iat": number,
	"iss": string,
	"jti": string,
	"nbf": number,
	"sub": string,
	"typ": string
}

export class SecurityService {
	
	public static SESSION_KEY = "session";
	
	public async signIn(data: { email: string, password: string}): Promise<any> {
		console.log({ data })
		return UHttp.post(`${GlobalVars.BASE_URL_API}sign_in`, data, UHttp.defaultHeaders());
	}
	
	public signOut(): void {
		this.removeToken();
		window.location.replace("/");
		window.location.reload();
	}
	
	public storeToken(token: string): void {
		Cookies.set(SecurityService.SESSION_KEY, token);
	}
	
	public static getToken(): string | undefined {
		return Cookies.get(SecurityService.SESSION_KEY);
	}
	
	public getAuthTokenData(): AuthTokenData | null {
		const token = SecurityService.getToken();
		if (!token || (token?.trim() || '').length == 0) {
			return null;
		}
		
		const [, payloadBase64,] = token.split('.');
		return JSON.parse(atob(payloadBase64));
	}
	
	public static isAuth(): boolean {
		return (SecurityService.getToken()?.trim() || '').length > 0;
	}
	
	
	public removeToken(): void {
		Cookies.remove(SecurityService.SESSION_KEY);
	}
	
}