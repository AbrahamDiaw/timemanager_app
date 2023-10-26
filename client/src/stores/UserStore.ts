import {UserService} from "../services/UserService";
import {User} from "../types/User";
import {Module} from "vuex";

interface UserState {
    users: User[];
    userById: User | null;
}

const initialState: UserState = {
    users: [],
    userById: null,
};

const userService = new UserService();

export const UserStore: Module<any, any> = {
    state: () => initialState,

    mutations: {
        setAllUsers(state, data: User[]) {
            console.log({data})
            state.users = data
        },
        addUser(state, user: User) {
            console.log(user)
            state.users.push(user)
        },


        /*  getByIdOrEmail: (state: UserState): User | null => {
              return state.userById;
          },*/
    },

    actions: {
        getAllUsers({commit}): void {
            userService.getAll()
                .then((usersData) => {
                    /*console.log(userData)*/
                    commit("setAllUsers", usersData)
                })
                .catch((err) => {
                    console.error(err.message)
                })
        },

        async getById({state}: { state: UserState }, userId: string): Promise<void> {
            state.userById = await userService.getById(userId)
        },

        async getByEmail({state}: { state: UserState }, email: string): Promise<void> {
            state.userById = await userService.getByEmail(email)
        },

        addNewUser({commit}): void {
            let data = {
                email: "abrahamt@gmail.com",
                username: "abraham",
            }

            userService.add(data)
                .then((userData) => {
                    /*console.log(userData)*/
                    commit("addUser", userData)
                })
                .catch((err) => {
                    console.error("err:", err.message)
                })
        },
        /*
                async updateById({ state }: { state: UserState }, userId: string, data: User): Promise<void> {
                    state.userById = await userService.updateById(userId, data)
                },

                async deleteById({ state }: { state: UserState }, userId: string): Promise<void> {
                    state.userById = await userService.deleteById(userId)
                }*/
    },
};