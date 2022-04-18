export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  success?: boolean;
  createdAt: Date;
}

export interface Token {
  token: string;
}
