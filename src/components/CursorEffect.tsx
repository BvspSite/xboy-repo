import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorEffect = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoother spring configuration
  const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e);
      
      // Update trail positions with smoother delay
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          const delay = index * 40; // Smoother delay
          setTimeout(() => {
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
            trail.style.opacity = `${0.6 - index * 0.12}`;
          }, delay);
        }
      });
    };
    
    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
        cursorRef.current.style.transition = 'opacity 0.2s ease-out';
      }
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          trail.style.opacity = `${0.6 - index * 0.12}`;
          trail.style.transition = `opacity 0.3s ease-out`;
        }
      });
    };
    
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
        cursorRef.current.style.transition = 'opacity 0.2s ease-out';
      }
      trailRefs.current.forEach(trail => {
        if (trail) {
          trail.style.opacity = '0';
          trail.style.transition = 'opacity 0.2s ease-out';
        }
      });
    };
    
    // Handle hover effects on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('a, button, .project-card, .skill-card')
      ) {
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'scale(1.8) rotate(45deg)';
          cursorRef.current.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          const innerDiv = cursorRef.current.querySelector('.cursor-diamond') as HTMLElement;
          if (innerDiv) {
            innerDiv.style.backgroundColor = 'rgba(59, 130, 246, 0.4)';
            innerDiv.style.borderColor = 'rgba(147, 51, 234, 1)';
          }
        }
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('cursor-pointer')
      ) {
        if (cursorRef.current) {
          cursorRef.current.style.transform = 'scale(1) rotate(45deg)';
          cursorRef.current.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          const innerDiv = cursorRef.current.querySelector('.cursor-diamond') as HTMLElement;
          if (innerDiv) {
            innerDiv.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
            innerDiv.style.borderColor = 'rgba(59, 130, 246, 1)';
          }
        }
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);
  
  return (
    <>
      {/* Main Cursor - Diamond Shape */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: cursorX,
          top: cursorY,
          x: '-50%',
          y: '-50%',
        }}
      >
        <div 
          className="cursor-diamond bg-blue-400/20 border-2 border-blue-400 backdrop-blur-sm transition-all duration-300"
          style={{
            width: '20px',
            height: '20px',
            transform: 'rotate(45deg)',
          }}
        ></div>
      </motion.div>
      
      {/* Cursor Trail - Diamond Shapes */}
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) trailRefs.current[index] = el;
          }}
          className="fixed pointer-events-none z-[9998] mix-blend-difference cursor-trail"
          style={{
            transition: `all ${0.2 + index * 0.05}s cubic-bezier(0.4, 0, 0.2, 1)`,
            opacity: 0,
          }}
        >
          <div
            className="cursor-diamond bg-blue-400/30 border border-blue-400/50 backdrop-blur-sm"
            style={{
              width: `${16 - index * 2}px`,
              height: `${16 - index * 2}px`,
              transform: `translate(-50%, -50%) rotate(45deg) scale(${1 - index * 0.15})`,
              transition: `all ${0.2 + index * 0.05}s cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          ></div>
        </div>
      ))}
    </>
  );
};

