import * as Yup from 'yup';

export const LoginValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email('enter correct email')
      .required('email is required'),
    password: Yup.string().required('password is required'),
  });

export const LeaveValidationSchema = () =>
  Yup.object({
    leaveType: Yup.string().required('Leave type is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date cannot be before start date'),
    reason: Yup.string()
      .trim()
      .min(5, 'Reason must be at least 5 characters')
      .required('Reason is required'),
  });
