"use client";

import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export default function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start font-sans overflow-hidden">
      {/* 
          Instead of a literal plastic frame, we create a premium, 
          mobile-first responsive container that feels like the 
          clean, flat front of an S25 Ultra.
      */}
      <div className="w-full max-w-[500px] h-screen bg-background flex flex-col relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
