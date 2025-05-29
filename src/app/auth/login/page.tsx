"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { login } from "src/lib/auth";
import Input from "src/components/ui/Input";
import Button from "src/components/ui/Button";
import Image from "next/image";
import { dummyUsers } from "src/lib/dummy-auth";
import { useState } from "react";
import IconButton from "src/components/ui/IconButton";
import IconEye from "src/components/ui/Icon/IconEye";
import IconEyeClose from "src/components/ui/Icon/IconEyeClose";
import { ShieldCheck, User } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, touchedFields },
    getValues,
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const validate = () => {
    const values = getValues();
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      for (const err of result.error.errors) {
        setError(err.path[0] as keyof FormData, { message: err.message });
      }
      return false;
    }
    return true;
  };

  const onSubmit = async (data: FormData) => {
    if (!validate()) return;
    try {
      const res = await login(data);
      document.cookie = `token=${res.token}; path=/`;
      document.cookie = `role=${res.role}; path=/`;
      router.push(res.role === "admin" ? "/admin/articles" : "/articles");
    } catch (err) {
      alert(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Gambar ilustrasi */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <Image
          src="/images/undraw_login_weas.svg" // Ganti dengan path sesuai
          alt="Login Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Form Login */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold">Selamat Datang Kembali</h1>
            <p className="text-gray-500">Silakan login untuk melanjutkan</p>
          </div>

          <div>
            <Input
              {...register("email")}
              placeholder="Email"
              variant="bordered"
              fullWidth
              error={Boolean(errors.email && touchedFields.email)}
              helperText={errors.email && String(errors.email.message)}
            />
          </div>

          <div>
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              variant="bordered"
              fullWidth
              endAdornment={
                <IconButton
                  sizes="small"
                  variant="text"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((p) => !p);
                  }}
                >
                  {showPassword ? <IconEye /> : <IconEyeClose />}
                </IconButton>
              }
              error={Boolean(errors.password && touchedFields.password)}
              helperText={errors.password && String(errors.password.message)}
            />
          </div>

          <Button type="submit" fullWidth sizes="large">
            Login
          </Button>
        </form>

        <div className="mt-12">
          <h2 className="text-lg font-bold mb-6 text-center">
            💡 Contoh Akun Demo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {dummyUsers.map((user, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow-md bg-white flex gap-2 items-start justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-800">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    Password: {user.password}
                  </p>
                  <p className="text-sm mt-1 flex items-center gap-1 text-gray-600">
                    {user.role === "admin" ? (
                      <ShieldCheck size={16} className="text-blue-500" />
                    ) : (
                      <User size={16} className="text-green-500" />
                    )}
                    <span className="capitalize">{user.role}</span>
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => {
                    // Autofill email & password
                    const { email, password } = user;
                    const inputs = document.querySelectorAll("input");
                    if (inputs[0]) inputs[0].value = email;
                    if (inputs[1]) inputs[1].value = password;
                    inputs[0].dispatchEvent(
                      new Event("input", { bubbles: true })
                    );
                    inputs[1].dispatchEvent(
                      new Event("input", { bubbles: true })
                    );
                  }}
                  sizes="small"
                  className="rounded"
                >
                  Autofill
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
