'use client';

import { getTokenFromSession } from '@/app/(helper)/check-token';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudentDashboardPage() {
  const [name, setName] = useState('');

  const router = useRouter();

  useEffect(() => {
    async function getStudentInfo() {
      try {
        const token = await getTokenFromSession();
        if (!token) {
          redirect('/login');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mahasiswa`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil info mahasiswa');
        }

        const data = await response.json();
        console.log(data.nama);
        setName(data.nama);
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi error saat mengambil data mahasiswa');
        setName('Mahasiswa');
      }
    }

    getStudentInfo();
  }, [router]);

  return (
    <>
      <h1 className="text-5xl font-bold">Halo {name ?? 'Mahasiswa'}!</h1>
      <h1 className="text-xl">Silakan tambahkan IRS Anda</h1>
    </>
  );
}
