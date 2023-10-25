import { UserService } from "../services/UserService.ts";
import { User } from "../types/User.ts";

interface UserState {
	users: User[];
	userById: User | null;
}

const initialState: UserState = {
	users: [],
	userById: null,
};

const userService = new UserService();

export const UserStore = {
	state: initialState,
	
	getters: {
		getAll(state: UserState): User[] {
			return state.users;
		},
		getById(state: UserState): User | null {
			return state.userById;
		},
	},
	
	actions: {
		async getAll({ state }: { state: UserState }): Promise<void> {
			state.users = await userService.getAll();
		},
		
		async getById({ state }: { state: UserState }, userId: string): Promise<void> {
			state.userById = await userService.getById(userId)
		},
		
		async getByEmail({ state }: { state: UserState }, email: string): Promise<void> {
			state.userById = await userService.getByEmail(email)
		},
		async add({ state }: { state: UserState }, data: User): Promise<void> {
			state.userById = await userService.add(data)
		},
		
		async updateById({ state }: { state: UserState }, userId: string, data: User): Promise<void> {
			state.userById = await userService.updateById(userId, data)
		},
		
		async deleteById({ state }: { state: UserState }, userId: string): Promise<void> {
			state.userById = await userService.deleteById(userId)
		}
	},
};