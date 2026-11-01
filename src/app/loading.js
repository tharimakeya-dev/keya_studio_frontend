import React from 'react';
import Spinner from '@/components/ui/Spinner';

export default function Loading() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <Spinner size="lg" label="Preparing Keya Studio Workspace..." />
    </div>
  );
}
