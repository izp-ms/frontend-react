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

export interface LoginResponse {
  token: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface UserData {
  id: string;
  nickName: string;
  email: string;
  role: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  avatarBase64: string;
  backgroundBase64: string;
  description: string;
  city: string;
  country: string;
  postcardsSent: number;
  postcardsReceived: number;
  score: number;
}

export interface UserUpdate {
  id: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  avatarBase64?: string;
  backgroundBase64?: string;
  description?: string;
  city?: string;
  country?: string;
}
