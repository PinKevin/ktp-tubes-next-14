import { IRS } from '@/models/irs';
import IRSTable from './irs-table';

const testIrs: IRS[] = [
  {
    id: 1,
    mahasiswa_id: '240601',
    jumlah_sks: 20,
    semester: 1,
    berkas_irs: 'test',
    isVerified: false,
  },
  {
    id: 2,
    mahasiswa_id: '240602',
    jumlah_sks: 20,
    semester: 3,
    berkas_irs: 'test',
    isVerified: true,
  },
  {
    id: 3,
    mahasiswa_id: '240603',
    jumlah_sks: 22,
    semester: 2,
    berkas_irs: 'test',
    isVerified: false,
  },
];

export default function StudentDashboardPage() {
  return (
    <div className="w-full px-4">
      <IRSTable irsList={testIrs} />
    </div>
  );
}
