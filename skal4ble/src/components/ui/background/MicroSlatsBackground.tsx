'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MicroSlats = dynamic(() => import('../../ReactBits/MicroSlats'), { ssr: false });

export default function MicroSlatsBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-white overflow-x-hidden isolate">
      {/* Camada do Canvas */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none">
        <MicroSlats />
      </div>

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 min-h-screen w-full">
        {children}
      </div>
    </div>
  );
}