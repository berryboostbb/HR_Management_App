import {
  View,
  StyleProp,
  TextStyle,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  Dimensions,
  FlatList,
  RefreshControl,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { rs,  useSearch } from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import Header from './Header';

const { width } = Dimensions.get('window');

interface Props extends TouchableOpacityProps {
  style?: any;
  bgColor?: any;
  children?: any;
  isPaddingH?: boolean;
  isTop?: boolean;
  isMarginHorizontal?: boolean;
  absoluteView?: any;
  scrollEnabled?: boolean;
  ListHeaderComponent?: any;
  stickyHeaderIndices?: number[];
  refetch?: any;
  search?: any;
  modal?: any;
  paddingTop?: any;
  paddingBottom?:any
  flatListProps?: Partial<React.ComponentProps<typeof FlatList>>;
}

const Wrapper = (props: Props) => {
  const theme: any = useTheme();
  const colors = theme.colors;
  const { searchActive, setSearchActive } = useSearch();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await props?.refetch?.();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (searchActive) {
        setSearchActive(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [searchActive, setSearchActive]);

  return (
    <View
      style={[
        styles.container,
        props.style,
        {
          marginHorizontal: props?.isMarginHorizontal ? rs(20) : 0,
          paddingTop: props?.isTop ? rs(50) : 0,
          paddingHorizontal: props?.isPaddingH ? rs(24) : 0,
          backgroundColor: props.bgColor
            ? props.bgColor
            : colors?.mainBackground,
        },
      ]}
    >
      {props.scrollEnabled !== false ? (
        <FlatList
          scrollEventThrottle={16}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom:props?.paddingBottom ??  rs(20),
              paddingTop: props?.paddingTop ? props.paddingTop : rs(120),
            },
          ]}
          refreshControl={
            props?.refetch && (
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                progressViewOffset={rs(130)}
              />
            )
          }
          ListHeaderComponent={props.ListHeaderComponent}
          stickyHeaderIndices={props.stickyHeaderIndices}
          data={props.flatListProps?.data || [1]} // default dummy data
          renderItem={props.flatListProps?.renderItem || (() => props.children)}
          {...props.flatListProps} // Spread external FlatList props
        />
      ) : (
        <View style={styles.nonScrollContent}>{props.children}</View>
      )}

      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <View style={[StyleSheet.absoluteFill]}>
          <LinearGradient
            colors={[
              'rgba(255,255,255,1)',
              'rgba(255,255,255,0.8)',
              'rgba(255,255,255,0.4)',
              'transparent',
            ]}
            style={StyleSheet.absoluteFill}
          />
        </View>
        <Header search={props?.search} />
      </View>

      {props.absoluteView && (
        <View style={styles.absoluteView}>{props.absoluteView}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  nonScrollContent: {
    flex: 1,
    paddingTop: rs(130),
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width,
    height: rs(120),
    justifyContent: 'flex-end',
    paddingHorizontal: rs(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    zIndex: 10,
  },
  absoluteView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
});

export default React.memo(Wrapper);
