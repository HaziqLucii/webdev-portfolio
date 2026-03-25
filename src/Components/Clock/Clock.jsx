import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="text-center">
      <div className="text-lg font-semibold mb-1" style={{ color: 'var(--fg)' }}>
        {formatTime(time)}
      </div>
      <div className="text-xs" style={{ color: 'var(--fg-2)' }}>
        {formatDate(time)}
      </div>
    </div>
  );
}