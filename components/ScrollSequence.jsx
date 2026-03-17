"use client";
import React, { useRef, useEffect, useState } from 'react';

const ScrollSequence = ({ frames, scrollThreshold = 1000 }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const imagesRef = useRef([]);

  useEffect(() => {
    // Preload images
    frames.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      imagesRef.current[index] = img;
    });

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const scrollFraction = Math.max(0, Math.min(1, -top / (height - window.innerHeight)));
      const frameIndex = Math.min(
        frames.length - 1,
        Math.floor(scrollFraction * frames.length)
      );
      
      if (frameIndex !== currentFrame) {
        setCurrentFrame(frameIndex);
        renderFrame(frameIndex);
      }
    };

    const renderFrame = (index) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const img = imagesRef.current[index];
      
      if (ctx && img && img.complete) {
        // Clear canvas and draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Handle aspect ratio
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial render
    const initialImg = new Image();
    initialImg.src = frames[0];
    initialImg.onload = () => renderFrame(0);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [frames, currentFrame]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${scrollThreshold}px` }}>
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-white">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none" />
      </div>
    </div>
  );
};

export default ScrollSequence;
