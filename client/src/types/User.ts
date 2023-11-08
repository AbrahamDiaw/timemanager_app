export type User = {
	id: string;
	username: string;
	email: string;
	role: string;
	password?: string;
}

export type AuthUser = User & {
	token?: string
}

export enum ROLES {
	EMPLOYEE= "employee",
	MANAGER= "manager",
	GENERAL_MANAGER= "general_manager",
}
