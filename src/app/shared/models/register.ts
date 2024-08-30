export interface IState {
  value: string;
  name: string;
}

export interface IUserCreds {
  email: string;
  password: string;
}

export interface INewUser extends IUserCreds {
  password_confirmation: string;
}

export interface INewUserRegistration extends INewUser{
  client_id: string;
}

export interface IUserCreateResponse {
  user: {
    id: number;
    access_token: string;
    created_at: number;
    email: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
  };
}

export interface IUserAuthResponse {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}
