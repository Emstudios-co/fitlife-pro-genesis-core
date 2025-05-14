
import React, { useState, useEffect } from "react";

interface FeatureBadgeProps {
  text: string;
}

const FeatureBadge = ({ text }: FeatureBadgeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div 
      className={`inline-block bg-accent/90 backdrop-blur-sm text-white rounded-full px-3 py-1 text-xs font-medium transition-all duration-500 ${
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
      }`}
    >
      {text}
    </div>
  );
};

export default FeatureBadge;
