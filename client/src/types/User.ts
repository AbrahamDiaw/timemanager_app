export type User = {
	id: string;
	username: string;
	email: string;
	role: string;
}

export type AuthUser = {
	token?: string,
	id?: string;
	username: string;
	email: string;
	role: string;
}

export enum ROLES {
	EMPLOYEE= "employee",
	MANAGER= "manager",
	GENERAL_MANAGER= "general_manager",
}