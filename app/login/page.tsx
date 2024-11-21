'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function processLogin(): Promise<{ token: string; role: string } | null> {
    try {
      const response: Response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return { token: data.token, role: data.role };
    } catch (error) {
      console.error('Error:', error);
      alert('Login gagal, silakan periksa kembali.');
      return null;
    }
  }

  function saveTokenToSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const loginData = await processLogin();

    if (loginData) {
      saveTokenToSession(loginData.token);
      if (loginData.role === 'Dosen') {
        router.push('/lecturer/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } else {
      alert('Login gagal, silakan periksa kembali');
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Masuk ke dalam aplikasi NEW SIAP UNDIP.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="w-full">
          <CardContent>
            <Input
              type="string"
              placeholder="Username"
              value={username}
              onChange={(u) => setUsername(u.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(p) => setPassword(p.target.value)}
              className="mt-5"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
