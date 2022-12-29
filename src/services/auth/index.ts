import axiosInstance from '../axios'

import ERoutes from "./endpoints"
import {ILoginRequest, ILoginResponse} from "@interfaces/auth"

export const useAuthAdmin = ()=> {
    const loginAdmin = (params: ILoginRequest) => axiosInstance.post<ILoginResponse>(ERoutes.LOGIN_ADMIN, params)

    return {
        loginAdmin
    }
}



