import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { AppText, BulletText, Card } from '@components';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTheme } from '@react-navigation/native';
import { rs } from '@utils';
import * as Progress from 'react-native-progress';

const LeavesCard = () => {
  const { colors } = useTheme();

  return (
    <Card marginTop={0} title="Leaves" title2="Office Staff">
      <View style={{ alignSelf: 'center', marginTop: rs(22) }}>
        <AppText
          size={18}
          bold
          color={colors.primary}
          style={{ position: 'absolute', top: rs(-16), right: rs(-16) }}
        >
          06
        </AppText>
        <AnimatedCircularProgress
          duration={700}
          size={116}
          width={8}
          fill={10}
          tintColor={colors.primary}
          rotation={0}
          backgroundColor="#E5EBF7"
        >
          {() => (
            <View style={styles.center}>
              <AppText size={18} bold color={colors.primary}>
                25
              </AppText>
              <AppText regular>Days</AppText>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={{ flexDirection: 'row', gap: rs(18), marginBottom: rs(12),marginTop:rs(18) }}>
        {/* <DotText title={'Used'} color={colors.primary} />
        <DotText title={'Balance'} color={'#E5EBF7'} /> */}
        <BulletText title="Used" bulletColor={colors.primary} titleColor={colors.text}/>
        <BulletText title="Balance" bulletColor={colors.cloudWhite}/>

      </View>

      <Bar
        unFillColor="#34C7591F"
        fillColor="#34C759"
        availedLeaves={5}
        totalLeaves={10}
      />
      <Bar
        unFillColor="#FFCC001F"
        fillColor="#FFCC00"
        title="Casual"
        availedLeaves={3}
        totalLeaves={12}
      />
      <Bar
        unFillColor="#E907611F"
        fillColor="#E90761"
        title="Sick Leave"
        availedLeaves={1}
        totalLeaves={10}
      />
    </Card>
  );
};

export default LeavesCard;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: rs(4),
    width: rs(4),
    borderRadius: 100,
  },
});



const Bar = ({
  title = 'Annual',
  fillColor,
  unFillColor,
  availedLeaves = 0,
  totalLeaves = 0,
}: any) => {
  const { colors } = useTheme();

  // ✅ Safe progress calculation
  const progress = totalLeaves > 0 ? availedLeaves / totalLeaves : 0;

  const percentage = Math.min(Math.max(progress, 0), 1);

  // 🔥 Animated value
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 800,
      useNativeDriver: false, // width animation
    }).start();
  }, [percentage]);

  const widthInterpolate = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:rs(8) }}>
      <AppText
        size={11}
        regular
        style={{ width: rs(80) }}
        color={colors.mediumGray}
      >
        {title}
      </AppText>

      <View
        style={{
          height: rs(12),
          width: rs(210),
          borderRadius: rs(24),
          overflow: 'hidden',
          backgroundColor: unFillColor,
        }}
      >
        <Animated.View
          style={{
            height: '100%',
            width: widthInterpolate,
            backgroundColor: fillColor,
            borderRadius: rs(24),
          }}
        />
      </View>

      <AppText
        size={10}
        regular
        color={colors.mediumGray}
        style={{ marginLeft: rs(8) }}
      >
        {availedLeaves}/{totalLeaves}
      </AppText>
    </View>
  );
};
