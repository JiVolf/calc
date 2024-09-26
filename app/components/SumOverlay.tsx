import React, { useState, useEffect } from 'react';

interface SumOverlayProps {
  sum: number;
  visible: boolean;
  duration: number;
}

const SumOverlay: React.FC<SumOverlayProps> = ({ sum, visible, duration }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setOpacity(1);
    
    if (visible) {
      const fadeTimeout = setTimeout(() => {
        const fadeInterval = setInterval(() => {
          setOpacity(prevOpacity => {
            if (prevOpacity <= 0) {
              clearInterval(fadeInterval);
              return 0;
            }
            return prevOpacity - 0.1;
          });
        }, 100);

        return () => {
          clearInterval(fadeInterval);
        };
      }, duration * 1000);

      return () => {
        clearTimeout(fadeTimeout);
      };
    }
  }, [visible, duration, sum]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 top-[18%] flex justify-center pointer-events-none"
      style={{ opacity, transition: 'opacity 0.1s ease-in-out' }}
    >
      <div className="text-yellow-500 text-4xl" style={{ textShadow: '-1px -1px 0 #1f2937, 1px -1px 0 #1f2937, -1px 1px 0 #1f2937, 1px 1px 0 #1f2937' }}>
        Sum: {sum}
      </div>
    </div>
  );
};


export default SumOverlay;