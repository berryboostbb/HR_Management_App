import * as Yup from 'yup';

export const LoginValidationSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email('enter correct email')
      .required('email is required'),
    password: Yup.string().required('password is required'),
    
  });