import { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';
import GlassSurface from '../GlassSurface/GlassSurface';
import Clock from '../Clock/Clock';

export default function MobileDock() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDock = () => {
    setIsExpanded(!isExpanded);
  };

  // Auto-minimize after 3 seconds
  useEffect(() => {
    let timer;
    if (isExpanded) {
      timer = setTimeout(() => {
        setIsExpanded(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isExpanded]);

  return (
    <>
      {/* Dock Button - Always visible */}
      <div className="fixed bottom-6 right-4 z-50 sm:hidden">
        <button
          onClick={toggleDock}
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 border border-white/20"
        >
          <FaClock size={18} />
        </button>
      </div>

      {/* Sliding Clock Panel */}
      <div 
        className={`fixed bottom-6 z-40 sm:hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'right-20' : 'right-[-200px]'
        }`}
      >
        <GlassSurface
          width={140}
          height={80}
          borderRadius={16}
          className="backdrop-blur-md"
        >
          <div className="h-full flex items-center justify-center p-4">
            <Clock />
          </div>
        </GlassSurface>
      </div>

      {/* Backdrop - Click to close */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-30 sm:hidden"
          onClick={toggleDock}
        />
      )}
    </>
  );
}