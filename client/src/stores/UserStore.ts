import create from "zustand-vue";
import { User } from "../types/User";
import { UserService } from "../services/UserService";

export type UserState = {
	users: User[];
	currentUser: User | null;
	findAll: () => void;
	add: (data: User) => void;
	findById: (userId: string) => void;
	updateById: (userId: string, data: User) => void;
	deleteById: (userId: string) => void;
}

const userService = new UserService();

export const UserStore = create<UserState>(
	(set) => ({
		users: [],
		currentUser: {
			id: "1",
			username: "john",
			email: "john",
			role: ""
		},
		authUser : null,
		
		findAll: () => {
			userService.getAll()
				.then((users) => {
					set({ users })
				})
				.catch((err) => {
					console.error(err.message);
				});
		},
		findById: (userId: string) => {
			userService.getById(userId)
				.then((user) => {
					set({ currentUser: user });
				})
				.catch((err) => {
					console.error(err.message);
				});
		},

		add: (data: User) => {
			userService.add(data)
				.then((user) => {
					set((state: any) => {
						let _users: any = [...state.users];
						_users.push(user);
						return { users: _users }
					})
				})
				.catch((err) => console.error(err.message))
		},
		
		updateById: (userId: string, data: User) => {
			userService.updateById(userId, data)
				.then((newUserData) => {
					set((state: any) => {
						let _users: any = [...state.users];

						const _updateUserInUsers = _users.map((user: any) => {
							if (user.id === newUserData.id) {
								return newUserData;
							} else {
								return user;
							}
						});

						return { users: _updateUserInUsers };
					});

					set({ currentUser: newUserData });
				})
				.catch((err) => {
					console.error(err.message);
				});
		},
		deleteById: (userId: string) => {
			userService.deleteById(userId)
				.then((res) => {
					set((state: any) => {
						let _newUsers = state.users.filter((user: User) => user.id !== userId);
						return { users: _newUsers };
					});
				})
				.catch((err) => {
					console.error(err);
				});
		},
	})
)
