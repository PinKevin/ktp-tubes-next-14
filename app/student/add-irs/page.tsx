'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useEffect, useState } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { getTokenFromSession } from '@/app/(helper)/check-token';
import { IRS } from '@/models/irs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf'];

const formSchema = z.object({
  semester: z.string().min(1, { message: 'Silakan pilih semester.' }),
  sks: z
    .string()
    .regex(/^\d+$/, { message: 'SKS harus berupa angka.' })
    .refine((val) => parseInt(val) > 0 && parseInt(val) <= 24, {
      message: 'SKS harus bernilai 1-24.',
    }),
  nilai: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: 'Nilai harus berupa angka desimal dengan dua digit di belakang koma.',
    })
    .refine((val) => parseFloat(val) > 0 && parseFloat(val) <= 4, {
      message: 'SKS harus bernilai 1-4.',
    }),
  irs: z
    .instanceof(File, { message: 'Masukan harus berupa file' })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Ukuran maksimal file adalah 5MB`)
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), 'Hanya boleh upload PDF'),
});

type FormData = z.infer<typeof formSchema>;

export default function EnhancedStudentForm() {
  const router = useRouter();
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [, setFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semester: '',
      sks: '',
      nilai: '',
    },
    mode: 'onBlur',
  });

  async function processIRS({ semester, sks, nilai, irs }: FormData) {
    try {
      const token = await getTokenFromSession();
      if (!token) {
        throw new Error('Anda belum login');
      }

      const formData = new FormData();
      formData.append('semester', semester);
      formData.append('jumlah_sks', sks);
      formData.append('nilai', nilai);
      formData.append('berkas_irs', irs);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/irs/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload IRS gagal');
      }

      const data: IRS = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      alert('Login gagal, silakan periksa kembali.');
      return null;
    }
  }

  const onSubmit = async (data: FormData) => {
    console.log('Form Data: ', data);
    const result = await processIRS(data);
    console.log(`result from onSubmit: ${result?.id}`);
    if (result) {
      setIsAddSuccess(true);
    }
  };

  useEffect(() => {
    const token = getTokenFromSession();
    if (!token) {
      router.push('/login'); // Redirect ke login jika token tidak ada
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Isi IRS</CardTitle>
          <CardDescription>Isi detail IRS anda dan upload file IRS.</CardDescription>
        </CardHeader>
        <CardContent>
          {isAddSuccess && (
            <div className="mt-6">
              <Alert className="bg-green-500">
                <AlertTitle className="text-white font-bold">Berhasil!</AlertTitle>
                <AlertDescription className="text-white">Upload IRS berhasil!</AlertDescription>
              </Alert>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="semester"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Semester" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Semester</SelectLabel>
                          {[...Array(14)].map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>Pilih Semester (1-14).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKS</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="SKS" />
                    </FormControl>
                    <FormDescription>Masukkan jumlah SKS (1-24).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nilai"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nilai</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nilai" />
                    </FormControl>
                    <FormDescription>Masukkan nilai (1-4) dalam desimal.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="irs"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>IRS (PDF)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFile(file);
                            onChange(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>Upload IRS anda dalam format PDF (max 5MB).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Upload
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
