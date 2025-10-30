import React, { useRef, useEffect, useState } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);
    
    const handleChange = (e) => {
      setShouldAnimate(!e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentCanvas = canvasRef.current;
    if (currentCanvas) {
      observer.observe(currentCanvas);
    }

    return () => {
      if (currentCanvas) {
        observer.unobserve(currentCanvas);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !shouldAnimate) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Particle class
    class Particle {
      constructor(width, height) {
        this.width = width;
        this.height = height;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 2; // 2-4px
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.3 - 0.1;
        this.color = Math.random() > 0.3 ? '#00A6FF' : '#FFDD57';
        this.opacity = Math.random() * 0.2 + 0.1;
        this.originalOpacity = this.opacity;
        this.opacityChangeSpeed = (Math.random() * 0.05) - 0.025;
      }
      
      update() {
        if (!shouldAnimate) return;
        
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Reset if out of bounds
        if (this.x > this.width) this.x = 0;
        if (this.x < 0) this.x = this.width;
        if (this.y > this.height) this.y = 0;
        if (this.y < 0) this.y = this.height;
        
        // Gentle opacity flicker
        this.opacity += this.opacityChangeSpeed;
        if (this.opacity > this.originalOpacity + 0.05 || this.opacity < this.originalOpacity - 0.05) {
          this.opacityChangeSpeed *= -1;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`).replace('rgb', 'rgba');
        ctx.fill();
      }
    }
    
    // Initialize particles
    let particles = [];
    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth <= 767 ? 20 : 40;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!isVisible || !shouldAnimate) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start everything
    resizeCanvas();
    initParticles();
    
    if (shouldAnimate) {
      animate();
    } else {
      // Draw static particles when reduced motion is preferred
      particles.forEach(particle => particle.draw());
    }
    
    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initParticles();
      if (!shouldAnimate) {
        particles.forEach(particle => particle.draw());
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, shouldAnimate]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ 
        opacity: isVisible ? 0.7 : 0, 
        transition: 'opacity 0.5s ease-in-out',
        // Static background when reduced motion is preferred
        background: shouldAnimate ? 'none' : 'radial-gradient(circle at 20% 50%, rgba(0, 166, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 221, 87, 0.05) 0%, transparent 50%)'
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
