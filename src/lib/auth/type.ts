type Role = 'user' | 'admin';

export type User = {
  id: string;
  email: string;
  password: string;
  role: Role;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  token: string;
  role: Role;
};