import { Tabs, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent, TabsList } from '@radix-ui/react-tabs';
import IRSTable from './irs-table';
import { IRS } from '@/models/irs';

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
    isVerified: false,
  },
];

export default function TableTabs() {
  return (
    <Tabs defaultValue="notVerified" className="w-full">
      <TabsList className="grid w-[400px] grid-cols-2 mb-5">
        <TabsTrigger value="notVerified">Belum disetujui</TabsTrigger>
        <TabsTrigger value="verified">Sudah disetujui</TabsTrigger>
      </TabsList>
      <TabsContent value="notVerified">
        <IRSTable irsList={testIrs} />
      </TabsContent>
      <TabsContent value="verified">
        <IRSTable irsList={testIrs} />
      </TabsContent>
    </Tabs>
  );
}
