import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { rs } from '@utils';

const { height } = Dimensions.get('window');

export default function CustomModal({
  visible,
  onClose,
  children,
  bottom,
  fotter = true,
  onFooterPress,
  centerLayout = false,
  modalHeight = 708
}: any) {
  const translateY = useSharedValue(height);

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : height, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });
  }, [visible]);

  const gesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationY > 0) translateY.value = e.translationY;
    })
    .onEnd(e => {
      if (e.translationY > 120) {
        translateY.value = withTiming(height, { duration: 200 }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withTiming(0, { duration: 200 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      {visible && <Pressable style={styles.backdrop} onPress={onClose} />}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={StyleSheet.absoluteFill}
      >
        {centerLayout ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {children}
          </View>
        ) : (
          <Animated.View
            style={[
              styles.sheet,
              animatedStyle,
              {
                borderTopLeftRadius: bottom ? 0 : 16,
                borderTopRightRadius: bottom ? 0 : 16,
                height:modalHeight
              },
            ]}
          >
            {!bottom && (
              <GestureDetector gesture={gesture}>
                <View style={{ paddingTop: rs(8) }}>
                  <View style={styles.notch} />
                </View>
              </GestureDetector>
            )}
            <View style={{ flex: 1 }}>{children}</View>
          </Animated.View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  notch: {
    width: 68,
    height: 2,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    alignSelf: 'center',
    marginBottom: 8,
  },
});
