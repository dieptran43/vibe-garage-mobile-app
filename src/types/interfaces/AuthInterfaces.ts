import {EAccountType} from '../enums';

export interface ILogin {
  username: String;
  password: String;
}

export interface IRegistration {
  username: String;
  email: String;
  password: String;
  name: String;
  account_type: EAccountType;
}

export interface IActivateAccount {
  code: String;
}

export interface IToken {
  token: String;
}
