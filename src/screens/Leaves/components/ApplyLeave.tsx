import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  DropDownData,
  LabelInput,
  ModalFooter,
  ModalHeader,
} from '@components';
import { CalenderIcon, CalenderIcon2, DropIcon, UpIcon } from '@assets';
import { rs, SelectType } from '@utils';
import { useFormik } from 'formik';
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';
import { useTheme } from '@react-navigation/native';

const ApplyLeave = () => {
  const {colors} = useTheme()
  const [open, setOpen] = useState('');
  const defaultStyles:any = useDefaultStyles();
const customStyles = {
  ...defaultStyles,
  container: {
    ...defaultStyles.container,
    backgroundColor: '#fff', // calendar background
  },
  dayContainer: {
    ...defaultStyles.dayContainer,
    borderRadius: 24, // circular day
  },
  dayText: {
    color: 'red', // normal dates color
  },
  selectedDayContainer: {
    ...defaultStyles.selectedDayContainer,
    backgroundColor: '#34C759', // selected dates background
    borderRadius: 24, // circular selected date
  },
  selectedDayText: {
    ...defaultStyles.selectedDayText,
    color: '#fff', // text color for selected dates
  },
  startDateContainer: {
    ...defaultStyles.startDateContainer,
    backgroundColor: '#FF9500', // start date color
    borderRadius: 24,
  },
  startDateText: {
    ...defaultStyles.startDateText,
    color: '#fff',
  },
  endDateContainer: {
    ...defaultStyles.endDateContainer,
    backgroundColor: '#FF3B30', // end date color
    borderRadius: 24,
  },
  endDateText: {
    ...defaultStyles.endDateText,
    color: '#fff',
  },
};

  const [range, setRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  console.log("Start Date:", range.startDate?.toISOString());


  // const showMode = () => {
  //   DateTimePickerAndroid.open({
  //     value: new Date(),
  //     onChange: onChange,
  //     mode: 'date',
  //     is24Hour: true,
  //     minimumDate: new Date(),
  //   });
  // };

  return (
    <View>
      <ModalHeader title="Apply Leave" />

      <View style={{ marginTop: rs(24), marginHorizontal: rs(12) }}>
        {open !== 'date' && (
          <LabelInput
            // formik={formik?.touched.doctorList && formik?.errors.doctorList}
            label="Select Type"
            placeholder="e.g, sick leave"
            icon
            // selectValue={allDoctors?.data?.filter((doctor: any) =>
            //   formik.values.doctorList.includes(doctor._id),
            // )}

            endIcon={open === 'leave' ? <UpIcon /> : <DropIcon />}
            onPress={() => setOpen(open === 'leave' ? '' : 'leave')}
            dorpDownheight={'auto'}
            renderDropDownContent={
              open === 'leave' && (
                <DropDownData
                  data={SelectType}
                  // selectedValues={formik.values.doctorList}
                  keyName="name"
                  onSelect={(item: any) => {}}
                />
              )
            }
          />
        )}

        <LabelInput
          editable={false}
          onPress={() => setOpen(open === 'date' ? '' : 'date')}
          label="Select Date"
          placeholder="e.g, 6 Oct, 2025"
          icon={true}
          endIcon={<CalenderIcon2 size={'24'} />}
        />
        {open === 'date' && (
          <DateTimePicker
          
            mode="range"
            startDate={range.startDate}
            endDate={range.endDate}
            onChange={({ startDate, endDate }: any) =>
              setRange({ startDate, endDate })
            }
            minDate={new Date()}
            styles={{...defaultStyles,
              selected:{backgroundColor:colors.primary},
              
            }}
          />
        )}
        {open !== 'date' && (
          <>
            <LabelInput
              editable={false}
              label="No Of Days"
              placeholder="Select dates from calender"
            />
            <LabelInput
              label="Reason"
              placeholder="Lorem ipsum dolor sit amet consectetur. Vehicula porttitor sed id sed."
            />
          </>
        )}
      </View>

      <ModalFooter title="Apply" />
    </View>
  );
};

export default ApplyLeave;

const styles = StyleSheet.create({});
