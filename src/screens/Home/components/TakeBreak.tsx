import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Break } from '@assets';
import { AppText } from '@components';
import { rs } from '@utils';

interface Props {
  checkInTime: string;
  isCheckedIn: boolean;
  color: string;
}

const TakeBreak = ({ checkInTime, isCheckedIn, color }: Props) => {

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
    <View style={styles.container}>
      <Break />
      <AppText
        size={18}
        style={{ fontFamily: 'monospace', fontWeight: 'bold' }}
      >
      {isCheckedIn ? formatTime(elapsed) : '00:00:00'}
      </AppText>
    </View>
  );
};

export default TakeBreak;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', gap: rs(14) },
});
