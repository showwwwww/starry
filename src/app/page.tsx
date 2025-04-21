'use client';
import React from 'react';
import Application from './models/Application';

export default function Page() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    if (!canvasRef.current) return;
    new Application({ canvas: canvasRef.current });
  }, [canvasRef]);

  return <canvas ref={canvasRef}></canvas>;
}
