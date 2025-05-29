import { dummyUsers } from "../dummy-auth";

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type AuthResponse = {
  token: string;
  role: "admin" | "user";
};

export async function login(data: LoginData): Promise<AuthResponse> {
  const user = dummyUsers.find(
    (u) => u.email === data.email && u.password === data.password
  );
  console.log({ data, dummyUsers, user });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  return { token: "dummy-token", role: user.role as "admin" | "user" };
}

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  console.log(data);
  return { token: "dummy-token", role: "user" };
}
