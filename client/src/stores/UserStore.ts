import create from "zustand-vue";
import { AuthUser, User } from "../types/User";
import { UserService } from "../services/UserService";
import { SecurityService } from "../services/SecurityService";

export type UserState = {
	users: User[];
	currentUser: User | null;
	authUser: AuthUser | null
	findAll: () => void;
	add: (data: User) => void;
	findById: (userId: string) => Promise<any>;
	resetCurrentUser: () => void;
	findAuthUser: (userId: string) => void;
	updateById: (userId: string, data: AuthUser | User, auth?: boolean) => Promise<any>;
	deleteById: (userId: string) => void;
}

const userService = new UserService();

export const UserStore = create<UserState>(
	(set) => ({
		users: [],
		currentUser: null,
		authUser: null,
		
		findAll: () => {
			userService.getAll()
				.then((users) => {
					set({ users })
				})
				.catch((err) => {
					console.error(err.message);
				});
		},
		findById: async (userId: string): Promise<any> => {
			return new Promise((resolve, reject) => {
				userService.getById(userId)
					.then((user) => {
						set({ currentUser: user });
						resolve(user)
					})
					.catch((err) => {
						console.error(err.message);
						reject()
					});
			})
			
		},
		resetCurrentUser: () => {
			set({ currentUser: null });
		},
		findAuthUser: (userId: string) => {
			userService.getById(userId)
				.then((user) => {
					set({ authUser: { ...user, token: SecurityService.getToken() } });
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
		
		updateById: (userId: string, data: AuthUser | User, auth): Promise<any> => {
			return new Promise((resolve, reject) => {
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
						
						if (auth) {
							set({ authUser: newUserData });
						} else {
							set({ currentUser: newUserData });
						}
						
						resolve(newUserData)
					})
					.catch((err) => {
						console.error(err.message);
						reject(err.message)
					});
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
