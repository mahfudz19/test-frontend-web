"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerUser } from "src/lib/auth"; // Fungsi request ke API Register
import Image from "next/image";
import Input from "src/components/ui/Input";
import Button from "src/components/ui/Button";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await registerUser(data);
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      router.push(res.role === "admin" ? "/admin/articles" : "/articles");
    } catch (err) {
      console.error(err);
      alert("Register gagal");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Gambar ilustrasi */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <Image
          src="/images/undraw_sign-up_z2ku.svg" // Ganti dengan path sesuai
          alt="Login Illustration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
      {/* Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold">Selamat Datang</h1>
            <p className="text-gray-500">Silakan daftar untuk melanjutkan</p>
          </div>

          <div>
            <Input
              {...register("name", { required: "Nama wajib diisi" })}
              placeholder="Nama"
              variant="bordered"
              fullWidth
              error={Boolean(errors.name && touchedFields.name)}
              helperText={errors.name && String(errors.name.message)}
            />
          </div>

          <div>
            <Input
              {...register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Format email tidak valid",
                },
              })}
              placeholder="Email"
              variant="bordered"
              fullWidth
              error={Boolean(errors.email && touchedFields.email)}
              helperText={errors.email && String(errors.email.message)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 6,
                  message: "Password minimal 6 karakter",
                },
              })}
              type="password"
              placeholder="Password"
              variant="bordered"
              fullWidth
              error={Boolean(errors.email && touchedFields.email)}
              helperText={errors.email && String(errors.email.message)}
            />
          </div>

          <Button fullWidth sizes="large" type="submit">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
