import create from "zustand-vue";
import { User } from "../types/User";
import { UserService } from "../services/UserService";

export type UserState = {
	users: User[];
	findAll: () => void;
}

const userService = new UserService();

export const UserStore = create<UserState>((set) => ({
	users: [],

	findAll: () => {
		userService.getAll()
			.then((users) => {
				set({ users })
			})
			.catch((err) => {
				console.error(err.message);
			});
	}
}));