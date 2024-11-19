'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import React, { useState } from 'react';
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf'];

const formSchema = z.object({
  semester: z.string().min(1, { message: 'Please select a semester.' }),
  sks: z
    .string()
    .regex(/^\d+$/, { message: 'SKS must be a number.' })
    .refine((val) => parseInt(val) > 0 && parseInt(val) <= 24, {
      message: 'SKS must be between 1 and 24.',
    }),
  irs: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), 'Only PDF files are allowed.'),
});

type FormData = z.infer<typeof formSchema>;

export default function EnhancedStudentForm() {
  const [, setFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semester: '',
      sks: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data: ', data);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Isi IRS</CardTitle>
          <CardDescription>Isi detail IRS anda dan upload file IRS.</CardDescription>
        </CardHeader>
        <CardContent>
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
                          <SelectValue placeholder="Select Semester" />
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
                      <Input {...field} placeholder="Enter SKS" />
                    </FormControl>
                    <FormDescription>Masukkan jumlah SKS (1-24).</FormDescription>
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
                Register
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
