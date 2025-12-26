import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  EyeHidden,
  EyeVisible,
  LogoV1,
  HR_Logo,
  SignInBackground,
} from '@assets';
import { Alert, rs } from '@utils';
import { AppText, PrimaryButton } from '@components';
import { useTheme } from '@react-navigation/native';
import { useFormik } from 'formik';
import { LoginValidationSchema } from '@services';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../src/api/authApi';
import { setIsLoggedIn, setToken, setUser } from '@redux';

const SignIn = () => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const styles = useStyles(colors);
  const [visible, setVisible] = useState(false);
  const dispatch: any = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const formik: any = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginValidationSchema(),
    onSubmit: async (values: any) => {
      try {
        const result = await login({
          email: values.email,
          password: values.password,
        }).unwrap();
        console.log("🚀 ~ SignIn ~ result:", result)
        await dispatch(setUser(result?.user));
        await dispatch(setToken(result.token));
        await dispatch(setIsLoggedIn(true));
        // Alert.showSuccess('Loggin Successful!');
      } catch (err) {
        console.warn('Login failed:', err);
      }
    },
  });

  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1,backgroundColor:"gray" }}
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    // >
    <ImageBackground source={SignInBackground} style={styles.container}>
      <Image source={HR_Logo} style={styles.logo} />
      <AppText medium size={32} center>
        Human Resource
      </AppText>
      <AppText
        color={colors.white}
        medium
        size={32}
        center
        lineHeight={rs(32)}
        style={{
          backgroundColor: '#11BAB0',
          width: rs(230),
          alignSelf: 'center',
          marginBottom: rs(24),
          letterSpacing: -0.25,
        }}
      >
        Management
      </AppText>
      <AppText
        style={styles.textWidth}
        center
        extraLight
        size={16}
        lineHeight={16}
      >
        A Complete Human Resource Management Solution.
      </AppText>
      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor={colors.mediumGray}
        value={formik?.values?.email}
        onChangeText={formik?.handleChange('email')}
      />
      {formik?.touched?.email && formik?.errors?.email && (
        <AppText style={styles.alignStart}>{formik?.errors?.email}</AppText>
      )}

      <View style={[styles.input, styles.mVertical_8]}>
        <TextInput
          placeholder="Password"
          style={styles.passInput}
          placeholderTextColor={colors.mediumGray}
          secureTextEntry={visible}
          value={formik?.values?.password}
          onChangeText={formik?.handleChange('password')}
        />
        <Pressable onPress={() => setVisible(!visible)}>
          {visible ? <EyeHidden /> : <EyeVisible />}
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: rs(32),
          marginBottom: rs(32),
        }}
      >
        {formik?.touched?.password && formik?.errors?.password && (
          <AppText style={styles.alignStart}>
            {formik?.errors?.password}
          </AppText>
        )}
        <AppText
          semiBold
          color={colors.yellow}
          style={{ position: 'absolute', right: 0 }}
        >
          Forgot Password
        </AppText>
      </View>

      <PrimaryButton
        onPress={formik.handleSubmit}
        title="Sign In"
        loading={isLoading}
      />
      {/* <View style={styles.gap} /> */}
      <Image style={styles.btmLogo} source={LogoV1} />
    </ImageBackground>

    // </KeyboardAvoidingView>
  );
};

export default SignIn;

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: rs(40),
    },
    logo: {
      height: rs(112),
      width: rs(93),
      alignSelf: 'center',
      marginTop: rs(100),
    },
    textWidth: {
      width: rs(250),
      marginBottom: rs(65),
      alignSelf: 'center',
    },
    input: {
      width: '100%',
      height: rs(48),
      borderRadius: rs(8),
      backgroundColor: colors.cloudWhite,
      paddingHorizontal: rs(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    passInput: { height: '100%', width: '85%' },
    mVertical_8: {
      // marginVertical: rs(8),
      marginTop: rs(8),
    },

    btmLogo: {
      height: rs(50),
      width: rs(140),
      position: 'absolute',
      bottom: rs(27),
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    gap: {
      // marginTop: rs(70),
    },
    alignStart: {
      // alignSelf: 'flex-start',
      color: 'red',
    },
  });
