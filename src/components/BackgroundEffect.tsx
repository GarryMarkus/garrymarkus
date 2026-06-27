"use client";

import { useEffect, useRef } from "react";

const TERMS = [
  "TCP/IP", "Nf3", "0x00", "e4", "AES-256", "O-O", "BGP", "SYN-ACK", 
  "Zero Trust", "0xCD", "exd5", "KERNEL", "VLAN", "Rxc6", "SSH", "0x89",
  "Botnet", "Qc2", "0xFF", "Rootkit", "Mate", "c4"
];

export function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      term: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Very slow drift
        this.vy = (Math.random() - 0.5) * 0.5;
        this.term = TERMS[Math.floor(Math.random() * TERMS.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges smoothly
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw(color: string) {
        if (!ctx) return;
        ctx.globalAlpha = 0.5; // Text opacity
        ctx.fillStyle = color;
        ctx.font = "10px monospace";
        ctx.fillText(this.term, this.x + 8, this.y + 3);
        
        ctx.globalAlpha = 0.8; // Dot opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Calculate amount based on screen size (roughly 1 per 25000 sq px)
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 25000);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = (color: string) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.globalAlpha = 0.25 * (1 - distance / 180); // Smooth fade based on proximity
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = getComputedStyle(canvas).color; // Automatically adapts to light/dark mode!
      
      drawLines(color);
      particles.forEach(p => {
        p.update();
        p.draw(color);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-20 pointer-events-none opacity-100 text-black dark:opacity-[0.25] dark:text-ink"
    />
  );
}
