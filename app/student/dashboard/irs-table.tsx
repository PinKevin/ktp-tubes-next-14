import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IRS } from '@/models/irs';

export default function IRSTable({ irsList }: { irsList: IRS[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daftar IRS</CardTitle>
        <CardDescription>Cek status persetujuan IRS Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Jumlah SKS</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {irsList.map((irs, index) => (
              <TableRow key={irs.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{irs.mahasiswa_id}</TableCell>
                <TableCell>{irs.semester}</TableCell>
                <TableCell>{irs.jumlah_sks}</TableCell>
                <TableCell>{irs.isVerified ? 'Sudah Disetujui' : 'Belum Disetujui'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
