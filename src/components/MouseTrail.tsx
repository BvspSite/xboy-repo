import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export const MouseTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const mousePoints: TrailPoint[] = [];
    const maxPoints = 20;

    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mousePoints.length < 2) {
        animationFrameRef.current = requestAnimationFrame(drawTrail);
        return;
      }

      for (let i = 0; i < mousePoints.length - 1; i++) {
        const currentPoint = mousePoints[i];
        const nextPoint = mousePoints[i + 1];

        const age = Date.now() - currentPoint.timestamp;
        const opacity = Math.max(0, 1 - age / 500);
        const size = Math.max(2, 5 - i * 0.2);

        // Draw gradient line
        const gradient = ctx.createLinearGradient(
          currentPoint.x,
          currentPoint.y,
          nextPoint.x,
          nextPoint.y
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(147, 51, 234, ${opacity * 0.3})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(currentPoint.x, currentPoint.y);
        ctx.lineTo(nextPoint.x, nextPoint.y);
        ctx.stroke();

        // Draw dots
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(currentPoint.x, currentPoint.y, size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(drawTrail);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePoints.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      });

      // Keep only recent points
      if (mousePoints.length > maxPoints) {
        mousePoints.shift();
      }

      // Remove old points
      const now = Date.now();
      while (mousePoints.length > 0 && now - mousePoints[0].timestamp > 500) {
        mousePoints.shift();
      }

      if (!animationFrameRef.current) {
        drawTrail();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9997]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

