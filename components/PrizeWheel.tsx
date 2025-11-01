'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Prize } from '@/types';

interface PrizeWheelProps {
  prizes: Prize[];
  onSpinComplete: (prize: Prize) => void;
  isSpinning: boolean;
}

export default function PrizeWheel({ prizes, onSpinComplete, isSpinning }: PrizeWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    drawWheel();
  }, [prizes]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sliceAngle = (2 * Math.PI) / prizes.length;

    prizes.forEach((prize, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = prize.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(prize.name, radius * 0.65, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw center text
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', centerX, centerY);
  };

  const handleSpin = async (winningPrize: Prize) => {
    if (isSpinning) return;

    // Play spin sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    // Calculate winning position
    const prizeIndex = prizes.findIndex(p => p.id === winningPrize.id);
    const sliceAngle = 360 / prizes.length;
    const prizeAngle = prizeIndex * sliceAngle;
    
    // Add multiple rotations plus the target angle
    const spins = 5;
    const randomOffset = Math.random() * (sliceAngle * 0.8) + (sliceAngle * 0.1);
    const targetRotation = (360 * spins) + (360 - prizeAngle) + randomOffset;

    setRotation(rotation + targetRotation);
    setSelectedPrize(winningPrize);

    // Wait for animation to complete
    setTimeout(() => {
      onSpinComplete(winningPrize);
    }, 4000);
  };

  // Expose handleSpin to parent via ref
  useEffect(() => {
    if (isSpinning && selectedPrize) {
      handleSpin(selectedPrize);
    }
  }, [isSpinning]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-500 drop-shadow-lg"></div>
      </div>

      {/* Wheel */}
      <motion.div
        animate={{ rotate: rotation }}
        transition={{
          duration: 4,
          ease: [0.17, 0.67, 0.12, 0.99],
        }}
        className="relative"
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="drop-shadow-2xl"
        />
      </motion.div>

      {/* Hidden audio element for spin sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/sounds/spin.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
