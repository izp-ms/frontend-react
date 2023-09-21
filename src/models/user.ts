export interface User {
  email: string;
  password: string;
}

export interface UserRegister {
  nickName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResponseLogin {
  token: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
