export interface IAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface IAuthTokenRequest {
  username: string;
  password: string;
}
