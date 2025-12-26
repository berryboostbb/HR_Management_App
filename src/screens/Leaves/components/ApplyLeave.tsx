import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  DropDownData,
  LabelInput,
  ModalFooter,
  ModalHeader,
} from '@components';
import { CalenderIcon, CalenderIcon2, DropIcon, UpIcon } from '@assets';
import { Alert, rs, SelectType, useBottomSheet } from '@utils';
import { useFormik } from 'formik';
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { LeaveValidationSchema } from '@services';
import { useApplyleveMutation } from '../../../../src/api/userApi';

const ApplyLeave = () => {
  const { colors } = useTheme();
  const defaultStyles: any = useDefaultStyles();
  const [open, setOpen] = useState('');
  const { user } = useSelector((state: any) => state.user);
  const { hideBottomSheet } = useBottomSheet();
    console.log("🚀 ~ ApplyLeave ~ user...:", user)

  const [applyLeave,{isLoading}] = useApplyleveMutation();

  // Formik setup
  const formik: any = useFormik({
    initialValues: {
      leaveType: '',
      reason: '',
      startDate: null as Date | null,
      endDate: null as Date | null,
    },
    validationSchema: LeaveValidationSchema(),

    onSubmit: async values => {
      const body = {
        employeeId: user?.employeeId,
        employeeName: user?.name,
        leaveType: values?.leaveType,
        reason: values?.reason,
        startDate: values?.startDate?.toISOString(),
        endDate: values?.endDate?.toISOString(),
      };

      try {
        await applyLeave({ body }).unwrap();

        Alert.showSuccess('Leave submitted successfully');
        hideBottomSheet();
      } catch (err: any) {
        console.log('Apply leave error:', err);
      }

      // console.log('Selected Dates:', body);

      // Do your submit logic here
    },
  });
  const calculateDays = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 0;

    const startDate = new Date(start);
    const endDate = new Date(end);

    // remove time part (important)
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays + 1; // inclusive (same day = 1)
  };

  const numberOfDays = calculateDays(
    formik.values.startDate,
    formik.values.endDate,
  );

  return (
    <View>
      <ModalHeader title="Apply Leave" />

      <View style={{ marginTop: rs(24), marginHorizontal: rs(12) }}>
        {open !== 'date' && (
          <LabelInput
            editable={false}
            formik={formik?.touched.leaveType && formik?.errors.leaveType}
            label="Select Type"
            placeholder="e.g, sick leave"
            icon
            removeIcon={false}
            selectValue={formik.values.leaveType}
            endIcon={open === 'leave' ? <UpIcon /> : <DropIcon />}
            onPress={() => setOpen(open === 'leave' ? '' : 'leave')}
            dorpDownheight={'auto'}
            renderDropDownContent={
              open === 'leave' && (
                <DropDownData
                  data={SelectType}
                  // selectedValues={formik.values.doctorList}
                  keyName="name"
                  onSelect={(item: any) => {
                    formik?.setFieldValue('leaveType', item?.name);
                    setOpen('');
                  }}
                />
              )
            }
          />
        )}

        {open !== 'date' && (
          <LabelInput
            editable={false}
            onPress={() => setOpen(open === 'date' ? '' : 'date')}
            label="Select Date"
            placeholder="e.g, 6 Oct, 2025"
            removeIcon={false}
            icon={true}
            endIcon={<CalenderIcon2 size={'24'} />}
            formik={formik.errors.startDate && formik.touched.startDate}
            selectValue={
              formik.values.startDate && formik.values.endDate
                ? `${formik.values.startDate.toDateString()} - ${formik.values.endDate.toDateString()}`
                : ''
            }
          />
        )}

        {open === 'date' && (
          <View style={styles.pickerContainer}>
            <DateTimePicker
              mode="range"
              startDate={formik.values.startDate}
              endDate={formik.values.endDate}
              onChange={({ startDate, endDate }: any) => {
                // If endDate is null, set it equal to startDate
                formik.setValues({
                  ...formik?.values,
                  startDate,
                  endDate: endDate || startDate,
                });
              }}
              minDate={new Date()}
              styles={{
                ...defaultStyles,
                selected: { backgroundColor: colors.primary },
              }}
            />

            {/* ✅ OK BUTTON */}

            <Text
              onPress={() => {
                formik.handleSubmit();
                setOpen('');
              }}
              style={{
                color: colors.primary,
                fontWeight: '600',
                alignSelf: 'flex-end',
                paddingHorizontal: rs(14),
              }}
            >
              OK
            </Text>

            {/* Show errors */}
          </View>
        )}

        {open !== 'date' && (
          <>
            <LabelInput
              editable={false}
              label="No Of Days"
              placeholder="Select dates from calender"
              value={String(numberOfDays)}
            />
            <LabelInput
              label="Reason"
              placeholder="Lorem ipsum dolor sit amet consectetur. Vehicula porttitor sed id sed."
              formik={formik?.touched.reason && formik?.errors.reason}
              value={formik?.values.reason}
              onChangeText={formik?.handleChange('reason')}
            />
          </>
        )}
      </View>

      {open !== 'date' && (
        <ModalFooter title="Apply" onPress={formik.handleSubmit} loading={isLoading} />
      )}
    </View>
  );
};

export default ApplyLeave;

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: rs(12),
    padding: rs(12),
    marginBottom: rs(24),
    elevation: 4,
  },
});
