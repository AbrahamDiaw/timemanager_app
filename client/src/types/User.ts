import { Team } from "./Team";

export type User = {
	id: string;
	username: string;
	email: string;
	role: ROLES;
	password?: string;
	teams: Team[]
}

export type AuthUser = User & {
	token?: string
}

export enum ROLES {
	ADMIN = "administrator",
	EMPLOYEE = "employee",
	MANAGER = "manager",
	GENERAL_MANAGER = "general_manager",
}
