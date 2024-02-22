import { IPatchUser } from "src/types/users/IUpdateUser"
import { instance } from "../instance"
import { IUserAuth } from "src/types/users"

export const usersApi = {
  loginUser: (userData: IUserAuth) => instance.post("user/login", userData),
  registerUser: (userData: IUserAuth) => instance.post("user/registration", userData),
  patchUser: (updatedUsers: IPatchUser) => instance.patch(`user/${updatedUsers.id}`, updatedUsers),
}
