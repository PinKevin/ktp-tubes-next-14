'use client';

import IRSTable from './irs-table';
import { getTokenFromSession } from '@/app/(helper)/check-token';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function StudentIRSPage() {
  const [irsList, setIrsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getStudentIRS() {
      try {
        const token = await getTokenFromSession();
        if (!token) {
          redirect('/login');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/irs`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Pengambilan IRS gagal');
        }

        const data = await response.json();
        setIrsList(data);
      } catch (error) {
        console.error('Error:', error);
        alert('Terjadi error saat mengambil IRS');
        setIrsList([]);
      } finally {
        setLoading(false);
      }
    }

    getStudentIRS();
  }, [router]);

  return (
    <div className="w-full px-4">{loading ? <p>Loading</p> : <IRSTable irsList={irsList} />}</div>
  );
}
