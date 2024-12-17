"use client";
import { UploadForm } from '@/components';
import { DataProvider } from '@/context/DataContext';

export default function Home() {
  return (
    <DataProvider>
      <UploadForm />
    </DataProvider >
  );
}
