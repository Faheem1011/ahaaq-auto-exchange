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
      const velocity = Math.random() * 2;
      return {
        x,
        y,
        size: Math.random() * 15 + 10,
        speedX: Math.cos(angle) * velocity,
        speedY: Math.sin(angle) * velocity - 0.5, // Natural upward drift
        color: `rgba(${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${Math.random() * 0.2 + 0.1})`,
        life: 1,
        decay: Math.random() * 0.015 + 0.005,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
      };
    };

    const handleMouseMove = (e) => {
      // Spawn particles slightly behind or at the cursor
      for (let i = 0; i < 4; i++) {
        particles.push(createParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("pointermove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life -= p.decay;
        p.size += 0.8;
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // Draw a soft smoke cloud using multiple overlapping arcs or just one with globalAlpha
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        // Use a slightly irregular shape (ellipse/multi-arc) for more "smoke" look
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        ctx.restore();

        if (p.life <= 0) {
          particles.splice(i, 1);
          i--;
        }
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
