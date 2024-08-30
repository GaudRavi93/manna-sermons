export interface IUser {
  church_id: number;
  created_at: string;
  email: string;
  family_name: string;
  given_name: string;
  honorific: string;
  id: number;
  manna_notifications: boolean;
  pastor_notifications: boolean;
  provider: string; // "email"
  suffix: string;
  uid: string; // "z@x.com"
  updated_at: string;

  city: string;
  state: string;
  stateName: string;
  zip: string;
  age: string;
  gender: string;
  ageName: string;
  genderName: string;
  unlisted_church_name: string;
  unlisted_church_city: string;
  unlisted_church_state: string;
  unlisted_church_state_name: string;

  // extra
  password: string;
  password_confirmation: string;
  church_name: string;
  pastor_name: string;
  church_state: string;
  church_stateName: string;
  church_city: string;

}

export interface IUserUpdate {
  given_name: string;
  family_name: string;
  pastors_notifications: boolean;
  manna_notifications: boolean;
  password: string;
  password_confirmation: string;
  // church_id: number;
  church_name: string;
}

export interface IUserLogin {
  email: string;
  password: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
}

export interface ISettingItem {
  name: string;
  path: string;
  url?: string;
}


