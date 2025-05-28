import data from '../dummy-auth.json';
import { RegisterPayload, RegisterResponse, User } from './type';

const dummyUsers: User[] = data.dummyUsers.map((u) => ({
  ...u,
  role: u.role as User['role'],
})); // in-memory copy

export async function login({ email, password }: { email: string; password: string }) {
  await new Promise((res) => setTimeout(res, 500));
  console.log(dummyUsers)

  const user = dummyUsers.find( (u) => u.email === email && u.password === password );

  if (!user) throw new Error('Email atau password salah');

  const token = btoa(`${user.id}:${user.role}`);

  return { token, role: user.role, userId: user.id} as { token: string; role: User['role']; userId: string };
}

export async function registerUser(payload: RegisterPayload): Promise<RegisterResponse> {
  await new Promise((res) => setTimeout(res, 500));

  const userExists = dummyUsers.find((u) => u.email === payload.email);
  if (userExists) throw new Error('Email sudah digunakan');

  const newUser: User = {
    id: Date.now().toString(),
    email: payload.email,
    password: payload.password,
    role: 'user',
  };

  dummyUsers.push(newUser);

  return { token: 'dummy-token-' + newUser.id, role: newUser.role };
}