import {User} from "../types/User.ts";
import {UHttp} from "../utils/UHttp.ts";
import {GlobalVars} from "../../vars/Global.ts";

export class UserService {

    public static async getUserById(userId: string): Promise<User> {
        let user = await UHttp.get(
            `${GlobalVars.BASE_URL_API}users/${userId}`,
            UHttp.defaultHeaders()
        )

        let response = await user.json();

        return response.data

    }

}