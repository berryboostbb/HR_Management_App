import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { AppText, Card } from '@components';
import { Month, rs, useBottomSheet, Year } from '@utils';
import { useTheme } from '@react-navigation/native';
import { CalenderIcon2 } from '@assets';
import WheelPicker from '@quidone/react-native-wheel-picker';
import WheelPickerFeedback from '@quidone/react-native-wheel-picker-feedback';

const AttendanceSummary = () => {
  const { colors } = useTheme();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear().toString();

  const [tempMonth, setTempMonth] = useState(currentMonth); // wheel temp
  const [tempYear, setTempYear] = useState(currentYear); // wheel temp
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(new Date().getMonth()); // current month
  const [yearValue, setYearValue] = useState(
    new Date().getFullYear().toString(),
  );
  const showPicker = useCallback(
    (v: boolean) => {
      if (v) {
        setTempMonth(value);
        setTempYear(yearValue);
      }
      setShow(v);
    },
    [value, yearValue],
  );
  const monthData = Month.map((month, index) => ({
    value: index,
    label: month,
  }));

  const yearData = Year.map(year => ({
    value: year.toString(), // ✅ string
    label: year.toString(),
  }));

  return (
    <Card title="Attendance Summary">
      <Pressable onPress={() => showPicker(true)} style={styles.dateBtn}>
        <AppText>
          {Month[value] ?? 'Select Month'} {yearValue}
        </AppText>
        <CalenderIcon2 />
      </Pressable>
      <View style={styles.row}>
        <View
          style={[styles.summaryCard, { backgroundColor: colors.lightGreen }]}
        >
          <AppText size={16} medium color={colors.green}>
            13
          </AppText>
          <AppText size={11} color={colors.green}>
            Present
          </AppText>
        </View>
        <View
          style={[styles.summaryCard, { backgroundColor: colors.lightYellow }]}
        >
          <AppText size={16} medium color={colors.yellow}>
            04
          </AppText>
          <AppText size={11} color={colors.yellow}>
            Short Duration
          </AppText>
        </View>
        <View
          style={[styles.summaryCard, { backgroundColor: colors.lightRed }]}
        >
          <AppText size={16} medium color={colors.red}>
            13
          </AppText>
          <AppText size={12} color={colors.red}>
            Leave
          </AppText>
        </View>
      </View>
      <Modal
        onRequestClose={() => showPicker(false)}
        animationType="fade"
        visible={show}
        backdropColor={'transparent'}
      >
        <View style={styles.wheelContainer}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              borderWidth: 1,
              justifyContent: 'space-between',
              borderRadius: rs(16),
              backgroundColor: colors.white,
              paddingHorizontal: rs(16),
              paddingBottom:rs(16)
            }}
          >
            <View style={{ width: '50%' }}>
              <WheelPicker
                data={monthData}
                value={tempMonth}
                onValueChanged={({ item }) => {
                  setTempMonth(item.value);
                  WheelPickerFeedback.triggerSoundAndImpact();
                }}
              />
            </View>

            <View style={{ width: '40%' }}>
              <WheelPicker
                data={yearData}
                value={tempYear}
                onValueChanged={({ item }) => {
                  setTempYear(item.value);
                  WheelPickerFeedback.triggerSoundAndImpact();
                }}
              />
            </View>
            <Pressable
              onPress={() => {
                setValue(tempMonth);
                setYearValue(tempYear);
                showPicker(false);
              }}
              style={[styles.btn, { borderColor: colors.primary }]}
            >
              <AppText>Ok</AppText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Card>
  );
};

export default AttendanceSummary;

const styles = StyleSheet.create({
  summaryCard: {
    height: rs(100),
    width: '32%',
    borderRadius: rs(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: rs(20),
  },
  dateBtn: {
    backgroundColor: '#fff',
    elevation: 2,
    position: 'absolute',
    right: rs(12),
    top: rs(12),
    paddingHorizontal: rs(8),
    paddingVertical: rs(4),
    borderRadius: rs(4),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rs(8),
  },
  btn: {
    borderWidth: 1,
    position: 'absolute',
    bottom: rs(12),
    right: rs(12),
    paddingHorizontal: rs(16),
    paddingVertical: rs(4),
    borderRadius: rs(4),
  },
  wheelContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: rs(16),
  },
});

{
  /* <MonthYearWheelPicker
        visible={show}
        onClose={() => setShow(false)}
        onConfirm={(m, y) => {
          console.log('Month:', m + 1, 'Year:', y);
          setShow(false);
        }}
      /> */
}


//   const data = Month.map((month, index) => ({
//     value: index, // 👈 internal value
//     label: month, // 👈 UI me show hone wala text
//   }));
//  <Modal
//       onRequestClose={() => showPicker(false)}
//       animationType="fade"
//       visible={show}
//       backdropColor={'transparent'}
//     >
//       <View style={styles.wheelContainer}>
//         <View>
//           <WheelPicker
//             style={{ backgroundColor: colors.white, borderRadius: rs(16) }}
//             data={data}
//             value={value}
//             onValueChanged={({ item }) => {
//               setValue(item.value);
//               WheelPickerFeedback.triggerSoundAndImpact();
//             }}
//           />
//           <Pressable
//             onPress={() => showPicker(false)}
//             style={[styles.btn, { borderColor: colors.primary }]}
//           >
//             <AppText>Ok</AppText>
//           </Pressable>
//         </View>
//       </View>
//     </Modal>