"use client";

import React, { useEffect, useRef } from "react";

export default function SmokeCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const createParticle = (x, y) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 1.5;
      return {
        x,
        y,
        size: Math.random() * 20 + 20, // Initial size larger but softer
        speedX: Math.cos(angle) * velocity,
        speedY: Math.sin(angle) * velocity - 0.3, 
        // Darker, more "asphalt" gray, lower base alpha
        color: { r: 60, g: 60, b: 65 }, 
        life: 1,
        decay: Math.random() * 0.04 + 0.03, // Much faster decay (shorter life)
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      };
    };

    const handleMouseMove = (e) => {
      // Significantly reduced spawn rate (only 1 particle occasionally)
      if (Math.random() > 0.6) {
        particles.push(createParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("pointermove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life -= p.decay;
        p.size += 1.5; // Quick expansion
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // Use a soft radial gradient instead of a hard circle
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        const alpha = p.life * 0.15; // Extremely subtle
        gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.4})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.restore();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="smoke-cursor-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999, // Above everything
      }}
    />
  );
}
