import React, { useEffect, useState, memo } from 'react';
import { AppText } from '@components';

interface Props {
  checkInTime: string;
  isCheckedIn: boolean;
  color: string;
}

const TimerText = ({ checkInTime, isCheckedIn, color }: Props) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isCheckedIn || !checkInTime) return;

    const checkInTimestamp = new Date(checkInTime).getTime();

    const update = () => {
      setElapsed(Math.floor((Date.now() - checkInTimestamp) / 1000));
    };

    update(); // initial
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [checkInTime, isCheckedIn]);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <AppText
      size={18}
      color={color}
      style={{ fontFamily: 'monospace', fontWeight: 'bold' }}
    >
      {isCheckedIn ? formatTime(elapsed) : '00:00:00'}
    </AppText>
  );
};

export default memo(TimerText);
