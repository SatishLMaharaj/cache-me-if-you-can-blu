"use client";

import { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export function Logo3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeContainer = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        containerRef.current.style.height = `${width}px`;
      }
    };

    resizeContainer();
    window.addEventListener('resize', resizeContainer);

    return () => {
      window.removeEventListener('resize', resizeContainer);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative">
      <Spline 
        scene="https://prod.spline.design/9V8fTcDeiDbFBnoN/scene.splinecode"
        className="w-full h-full absolute top-0 left-0"
      />
    </div>
  );
}