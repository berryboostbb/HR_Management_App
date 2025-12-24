import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from 'react-native-svg';
import { useTheme } from '@react-navigation/native';
// import { ArrowDown, Avatar, EditIcon, ForwardArrow } from '@assets';
import { AppText, PrimaryButton } from '@components';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '@redux';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowDown, Avatar, EditIcon, ForwardArrow } from '@assets';
import { Alert, ProfileData, rs } from '@utils';
import { useLogoutMutation } from '../../../src/api/authApi';
import ImagePicker from 'react-native-image-crop-picker';
import {
  useUpdateUserMutation,
  useUploadFileMutation,
} from '../../../src/api/userApi';

interface GradientCurvedHeaderProps {
  height?: number;
  colors?: string[];
  curveHeight?: number;
}

const Profile = () => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phoneNumber);
  const [open, setOpen] = useState('');
  const [updating, setUpdating] = useState(false);

  const [logoutApi, { isLoading }] = useLogoutMutation();

  const [uploadFile, { isLoading: loading }] = useUploadFileMutation();

  const [updateUser] = useUpdateUserMutation();

  const handleUpload = async () => {
    const image = await ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      compressImageQuality: 0.8,
    });

    const res: any = await uploadFile({
      fileType: 'images',
      image,
    }).unwrap();

    const updatedData = await await updateUser({
      id: user?._id,
      body: { ...user, image: res?.url },
    }).unwrap();

    dispatch(setUser(updatedData?.admin));
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
    } catch (err: any) {
      Alert.showError(err?.data?.message || 'Logout failed');
    }
  };

  const handleEdit = (title: any) => {
    if (title === 'Edit Profile') {
      setOpen(title === open ? '' : title);
    }
  };

  const onEditProfile = async () => {
    setUpdating(true);
    const updatedData = await updateUser({
      id: user?._id,
      body: { ...user, name: name, phoneNumber: phone },
    }).unwrap();
    dispatch(setUser(updatedData?.admin));
    Alert.showSuccess('Profile updated successfully');
    setUpdating(false);
    setOpen('');
  };

  return (
    <View style={{ backgroundColor: colors.mainBackground, flex: 1 }}>
      <GradientCurvedHeader
        height={216}
        colors={['#1B67F8', '#043083']}
        curveHeight={20}
      />
      <View style={{ flex: 1 }}>
        <View style={styles.curvedCard}>
          <View style={styles.absoluteContent}>
            <View>
              <View style={styles.uriView}>
                <Image
                  source={user?.image ? { uri: user?.image } : Avatar}
                  style={styles.uri}
                />
              </View>
              <Pressable onPress={handleUpload} style={styles.edit}>
                <LinearGradient
                  colors={['#1B67F8', '#043083']}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 1.7, y: 0.5 }}
                  style={styles.gradient}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <EditIcon color={colors.white} />
                  )}
                </LinearGradient>
              </Pressable>
            </View>
            <AppText size={16} medium>
              {
                user?.name ||
                'Paul Walker'
              }
            </AppText>
            <AppText
              color={colors.mediumGray}
              size={12}
              regular
              style={{ marginVertical: rs(2) }}
            >
              {user?.phoneNumber || '+92-322-123-4567'}
            </AppText>
            <AppText color={colors.mediumGray} size={12} regular>
              {user?.email || 'PaulWalker2025@berryboost.us'}
            </AppText>
            <View style={styles.divider} />
            <FlatList
              data={ProfileData}
              style={{ width: '100%' }}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View>
                  <Pressable
                    onPress={
                      item.title === 'Logout'
                        ? handleLogout
                        : () => handleEdit(item.title)
                    }
                    key={item?.id}
                    style={styles.row}
                  >
                    <item.icon />
                    <AppText regular>{item.title}</AppText>
                    <View style={styles.absoluteIcon}>
                      {item.title === 'Logout' && isLoading ? (
                        <ActivityIndicator
                          size="small"
                          color={colors.primary}
                        />
                      ) : open === 'Edit Profile' &&
                        item.title === 'Edit Profile' ? (
                        <ArrowDown />
                      ) : (
                        <ForwardArrow />
                      )}
                    </View>
                  </Pressable>
                  {open === 'Edit Profile' && item.title === 'Edit Profile' && (
                    <View style={{ gap: rs(8) }}>
                      <TextInput
                        style={styles.input}
                        placeholder="User Name"
                        placeholderTextColor={colors.mediumGray}
                        value={name}
                        onChangeText={(v: any) => setName(v)}
                      />
                      <TextInput
                        keyboardType="phone-pad"
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor={colors.mediumGray}
                        value={phone}
                        onChangeText={(v: any) => setPhone(v)}
                      />
                      <PrimaryButton
                        title="Save"
                        onPress={onEditProfile}
                        loading={updating}
                      />
                    </View>
                  )}
                </View>
              )}
              scrollEnabled={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const GradientCurvedHeader: React.FC<GradientCurvedHeaderProps> = ({
  height = 216,
  colors = ['red', 'green'],
  curveHeight = 20,
}) => {
  return (
    <Svg
      height={Dimensions.get('window').height / 3.5}
      width="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Defs>
        <SvgGradient id="grad" x1="50%" y1="0%" x2="120%" y2="0%">
          {colors.map((color, index) => (
            <Stop
              key={index}
              offset={`${(index / (colors.length - 1)) * 100}%`}
              stopColor={color}
              stopOpacity="1"
            />
          ))}
        </SvgGradient>
      </Defs>
      <Path
        d={`M0,0 L100,0 L100,${100 - curveHeight} Q50,100 0,${
          100 - curveHeight
        } Z`}
        fill="url(#grad)"
      />
    </Svg>
  );
};

export default Profile;

const useStyles = (colors: any) =>
  StyleSheet.create({
    curvedCard: {
      padding: rs(16),
      backgroundColor: colors.white,
      borderRadius: rs(16),
      position: 'absolute',
      width: '93%',
      top: rs(-80),
      alignSelf: 'center',
      height: rs(570),
      elevation: rs(5),
    },
    uriView: {
      height: rs(150),
      width: rs(150),
      borderRadius: rs(100),
      marginBottom: rs(12),
      borderWidth: 1,
      borderColor: colors.primary,
      overflow: 'hidden',
    },
    uri: {
      height: '100%',
      width: '100%',
    },
    absoluteContent: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: rs(-75),
      alignSelf: 'center',
      width: '100%',
    },
    divider: {
      borderBottomWidth: 1,
      width: '100%',
      marginTop: rs(16),
      borderColor: colors.mediumGray,
      opacity: 0.3,
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: rs(12),
      width: '100%',
      alignItems: 'center',
      gap: rs(12),
      paddingVertical: rs(20),
    },
    absoluteIcon: {
      position: 'absolute',
      alignSelf: 'center',
      right: rs(16),
    },
    gradient: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    edit: {
      height: rs(40),
      width: rs(40),
      position: 'absolute',
      alignSelf: 'center',
      borderRadius: rs(100),
      overflow: 'hidden',
      bottom: '13%',
      right: 0,
      zIndex: 1000,
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
  });
