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
import { Check, X } from 'lucide-react';

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
              <TableHead className="text-center">Semester</TableHead>
              <TableHead className="text-center">Jumlah SKS</TableHead>
              <TableHead className="text-center">Status Persetujuan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {irsList.map((irs, index) => (
              <TableRow key={irs.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="text-center">{irs.semester}</TableCell>
                <TableCell className="text-center">{irs.jumlah_sks}</TableCell>
                <TableCell className="flex justify-center items-center">
                  {irs.isVerified ? <Check /> : <X />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
