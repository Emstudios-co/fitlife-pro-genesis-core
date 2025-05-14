
import React, { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const Counter = ({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrameId: number;
    
    const startCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const progressRatio = Math.min(progress / duration, 1);
      const currentCount = Math.floor(progressRatio * end);
      
      setCount(currentCount);
      
      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(startCount);
      } else {
        setCount(end);
      }
    };
    
    animationFrameId = requestAnimationFrame(startCount);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, isVisible]);

  return (
    <div ref={countRef} className="counter-value font-bold text-3xl md:text-4xl text-primary">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};

export default Counter;
