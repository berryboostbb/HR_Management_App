import React, { useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-worklets';

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;
const CENTER_OFFSET = ITEM_HEIGHT * 2;

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const YEARS = Array.from({ length: 30 }, (_, i) => 2010 + i);

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (month: number, year: number) => void;
}

const WheelItem = React.memo(({ item, index, scrollY }:any) => {
  const animatedStyle = useAnimatedStyle(() => {
    const position = index * ITEM_HEIGHT;
    const distance = Math.abs(scrollY.value - position);
    const scale = interpolate(distance, [0, ITEM_HEIGHT * 2], [1.2, 0.8], Extrapolate.CLAMP);
    const opacity = interpolate(distance, [0, ITEM_HEIGHT * 2], [1, 0.3], Extrapolate.CLAMP);
    return { transform: [{ scale }], opacity };
  });
  return (
    <Animated.View style={[styles.item, animatedStyle]}>
      <Text style={styles.text}>{item}</Text>
    </Animated.View>
  );
});

const MonthYearWheelPicker: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const monthScroll = useSharedValue(0);
  const yearScroll = useSharedValue(0);

  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(YEARS[0]);

  const updateMonth = (index: number) => {
    setMonth(index);
  };

  const updateYear = (index: number) => {
    setYear(YEARS[index]);
  };

  const onMonthScroll = useAnimatedScrollHandler({
    onScroll: e => {
      monthScroll.value = e.contentOffset.y;
    },
    onMomentumEnd: e => {
      const index = Math.round(e.contentOffset.y / ITEM_HEIGHT);
      runOnJS(updateMonth)(index);
    },
  });

  const onYearScroll = useAnimatedScrollHandler({
    onScroll: e => {
      yearScroll.value = e.contentOffset.y;
    },
    onMomentumEnd: e => {
      const index = Math.round(e.contentOffset.y / ITEM_HEIGHT);
      runOnJS(updateYear)(index);
    },
  });

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Wheels */}
          <View style={styles.wheels}>
            <Animated.FlatList
              data={MONTHS}
              keyExtractor={(_, i) => i.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onScroll={onMonthScroll}
              scrollEventThrottle={16}
              contentContainerStyle={styles.list}
              renderItem={({ item, index }) => (
                <WheelItem item={item} index={index} scrollY={monthScroll} />
              )}
            />

            <Animated.FlatList
              data={YEARS}
              keyExtractor={(_, i) => i.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              onScroll={onYearScroll}
              scrollEventThrottle={16}
              contentContainerStyle={styles.list}
              renderItem={({ item, index }) => (
                <WheelItem item={item} index={index} scrollY={yearScroll} />
              )}
            />
          </View>

          {/* Center Highlight */}
          <View style={styles.highlight} />

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </Pressable>
            <Pressable onPress={() => onConfirm(month, year)}>
              <Text style={styles.confirm}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MonthYearWheelPicker;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingBottom: 20,
  },
  wheels: {
    flexDirection: 'row',
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  list: {
    paddingVertical: CENTER_OFFSET,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  highlight: {
    position: 'absolute',
    top: CENTER_OFFSET,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 12,
  },
  cancel: {
    color: '#999',
    fontSize: 16,
  },
  confirm: {
    color: '#34C759',
    fontSize: 16,
    fontWeight: '600',
  },
});
