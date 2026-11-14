'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MicroSlats = dynamic(() => import('@/src/components/ReactBits/MicroSlats'), { ssr: false });

export default function MicroSlatsBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh w-full bg-[#000000] text-white overflow-x-clip isolate">
      {/* Camada do Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <MicroSlats className="w-full h-full" />
      </div>

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 min-h-dvh w-full">
        {children}
      </div>
    </div>
  );
}