'use client';

// import { IRS } from '@/models/irs';
import IRSTable from './irs-table';
import { getTokenFromSession } from '@/app/(helper)/check-token';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// const testIrs: IRS[] = [
//   {
//     id: 1,
//     mahasiswa_id: '240601',
//     jumlah_sks: 20,
//     semester: 1,
//     berkas_irs: 'test',
//     isVerified: false,
//   },
//   {
//     id: 2,
//     mahasiswa_id: '240602',
//     jumlah_sks: 20,
//     semester: 3,
//     berkas_irs: 'test',
//     isVerified: true,
//   },
//   {
//     id: 3,
//     mahasiswa_id: '240603',
//     jumlah_sks: 22,
//     semester: 2,
//     berkas_irs: 'test',
//     isVerified: false,
//   },
// ];

export default function StudentDashboardPage() {
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
