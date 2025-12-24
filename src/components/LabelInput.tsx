import { DropIcon, Search } from '@assets';
import { rs } from '@utils';
import React, { ReactNode } from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  ScrollView,
} from 'react-native';
import AppText from './AppText';
import { useTheme } from '@react-navigation/native';

interface LabelInputProps extends TextInputProps {
  label: string;
  placeholder: string;
  icon?: boolean; // true if you want to show DropIcon
  onPress?: () => void;
  editable?: boolean;
  containerStyle?: ViewStyle;
  renderDropDownContent?: ReactNode;
  selectValue?: any;
  endIcon?: any;
  formik?: any;
  dorpDownheight?: any;
  onRemoveSelected?: () => void;
  removeIcon?: any;
  startIcon?: any;
  position?: any;
  textline?: any;
}

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  placeholder,
  icon,
  onPress,
  editable = true,
  containerStyle,
  renderDropDownContent,
  selectValue,
  endIcon,
  formik,
  dorpDownheight,
  onRemoveSelected,
  removeIcon = true,
  startIcon,
  position,
  textline,
  ...rest
}) => {
  const theme: any = useTheme();
  const colors: any = theme.colors;
  const styles = useStyles(colors);
  const Wrapper = onPress ? Pressable : View;
  const Remove = onRemoveSelected ? Pressable : View;
  const formikError = formik ? true : false;

  const isEmptyContent = (() => {
    if (
      renderDropDownContent === null ||
      renderDropDownContent === undefined ||
      renderDropDownContent === false ||
      renderDropDownContent === true ||
      (Array.isArray(renderDropDownContent) &&
        renderDropDownContent.length === 0)
    ) {
      return true;
    }

    if (React.isValidElement(renderDropDownContent)) {
      const element = renderDropDownContent as React.ReactElement<any>;
      if (
        element.type === React.Fragment &&
        (!element.props || !element.props.children)
      ) {
        return true;
      }
    }

    return false;
  })();

  return (
    <View style={[styles.container, containerStyle]}>
      <AppText
        size={16}
        regular
        color={colors.mediumGray}
        style={{
          zIndex: 1,
          alignSelf: 'flex-start',
          backgroundColor: '#fff',
          paddingHorizontal: rs(4),
          marginLeft: rs(16),
        }}
      >
        {label} {formikError && <AppText color={colors.red}>*</AppText>}
      </AppText>
      <Wrapper
        onPress={onPress}
        style={[
          styles.inputWrapper,
          { borderColor: formikError ? colors.red : colors.primary },
        ]}
      >
        {selectValue && selectValue?.length > 0 ? (
          <View style={styles.input}>
            {Array.isArray(selectValue) ? (
              selectValue.map((item: any, index: number) => {
                return (
                  <AppText
                    key={index}
                    style={styles.selectText}
                    color={colors.white}
                    lineHeight={14}
                  >
                    {item?.productName ||
                      item?.name ||
                      item?.label ||
                      String(item)}
                  </AppText>
                );
              })
            ) : (
              <Remove
                onPress={onRemoveSelected}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.primary,
                  padding: rs(4),
                  borderRadius: rs(4),
                  gap: rs(8),
                }}
              >
                <AppText
                  style={{}}
                  color={colors.white}
                  lineHeight={14}
                  numberOfLines={textline}
                >
                  {selectValue?.name ||
                    selectValue?.label ||
                    String(selectValue)}
                </AppText>
                {removeIcon === true && (
                  <AppText size={11} color={colors.white}>
                    ✕
                  </AppText>
                )}
              </Remove>
            )}
          </View>
        ) : (
          <View style={{ flex: 1, flexDirection: 'row', gap: rs(8) }}>
            {startIcon && startIcon}
            <TextInput
              style={[styles.input, !editable && { color: '#9ca3af' }]}
              placeholder={placeholder}
              placeholderTextColor="#bfc3c8"
              editable={editable}
              {...rest}
            />
          </View>
        )}

        {icon && (
          <View style={{ marginLeft: rs(8)}}>{endIcon ?? <DropIcon />}</View>
        )}
      </Wrapper>
      {!isEmptyContent && (
        <View
          style={{
            width: '100%',
            position: position === 'static' ? 'static' : 'absolute',
            zIndex: 1000,
            top: position === 'static' ? 0 : '100%',
            borderRadius: rs(6),
            backgroundColor: colors.white,
            paddingHorizontal: rs(12),
            paddingBottom: rs(12),
            elevation: 2,
            height: dorpDownheight ?? rs(240),
          }}
        >
          {renderDropDownContent}
        </View>
      )}
    </View>
  );
};

export default LabelInput;

const useStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },

    inputWrapper: {
      borderWidth: rs(0.5),
      borderColor: '#BFD6FF',
      borderRadius: rs(6),
      paddingHorizontal: rs(14),
      paddingVertical: rs(16),
      minHeight: rs(56),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      bottom: rs(10),
    },
    input: {
      flex: 1,
      fontSize: 13,
      color: '#111827',
      padding: 0,
      flexDirection: 'row',
      gap: rs(8),
       flexWrap: 'wrap',
      // overflow: 'hidden',
      // textAlignVertical: 'top',
    },
    selectText: {
      backgroundColor: colors.primary,
      padding: rs(4),
      borderRadius: rs(4),
      alignSelf:"center"
    },
  });
