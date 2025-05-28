'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await login(data);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      router.push(res.role === 'admin' ? '/admin/articles' : '/user/articles');
    } catch {
      alert('Login gagal');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-10 space-y-4">
      <div>
        <input
          {...register('email', {
            required: 'Email wajib diisi',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Format email tidak valid',
            },
          })}
          placeholder="Email"
          className="border p-2 w-full"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register('password', {
            required: 'Password wajib diisi',
            minLength: {
              value: 6,
              message: 'Password minimal 6 karakter',
            },
          })}
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
    </form>
  );
}