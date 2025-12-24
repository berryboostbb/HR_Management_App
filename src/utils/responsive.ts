import {Dimensions, Platform} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const TABLET_THRESHOLD = 600;

const {width} = Dimensions.get('window');

export const isTablet = width >= TABLET_THRESHOLD;

const isAndroid = Platform.OS == 'android';

const rs = (size: number): number => (isTablet ? size : moderateScale(size));

const rv = (size: number): number => (isTablet ? size : verticalScale(size));

const rsMatch = (android: number, ios: number) =>
  scale(isAndroid ? android : ios);

const rvMatch = (android: number, ios: number) =>
  verticalScale(isAndroid ? android : ios);

export {rs, rv, rsMatch, rvMatch};
