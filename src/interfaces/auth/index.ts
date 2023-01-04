export interface ILoginResponse {
    accessToken: string
    refreshToken: string
    type: string
}

export interface ILoginRequest {
    username: string
    password: string
}
