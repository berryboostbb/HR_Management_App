import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { AppText, SearchInput } from '@components';
import { rs } from '@utils';
import CheckBox from '@react-native-community/checkbox';

interface DropDownDataProps {
  data?: any;
  onSelect: (i?: any) => void;
  placeholder?: any;
  search?: boolean;
  showCheckbox?: any;
  keyName?: any;
  selectedValues?: any;
  disabledValues?: any;
}

const DropDownData = ({
  data,
  onSelect,
  placeholder,
  search = false,
  showCheckbox = false,
  selectedValues = [],
  keyName = '_id',
  disabledValues,
}: DropDownDataProps) => {
  return (
    <>
      {search && (
        <SearchInput
          placeholder={placeholder}
          containerStyle={styles.searchContainer}
        />
      )}

      <ScrollView nestedScrollEnabled>
        <FlatList
          scrollEnabled={false}
          data={data}
          keyExtractor={(item, index) =>
            item?.[keyName]?.toString() || index.toString()
          }
          renderItem={({ item }: any) => {
            const id = item?.[keyName];
            const isSelected = selectedValues.includes(id);
            const isDisabled = disabledValues?.includes(item?.name);
            return (
              <Pressable
                disabled={isDisabled}
                style={styles.item}
                onPress={() => onSelect(item)}
              >
                {showCheckbox && (
                  <CheckBox
                    value={isSelected}
                    onValueChange={() => onSelect(item)}
                  />
                )}

                <AppText
                  style={styles.text}
                  color={isDisabled ? 'lightgray' : 'black'}
                >
                  {item?.name || item?.productName} 
                </AppText>
              </Pressable>
            );
          }}
        />
      </ScrollView>
    </>
  );
};

export default DropDownData;

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 0,
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    borderRadius: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: rs(14),
    gap: rs(10),
  },
  text: {
    flex: 1,
  },
});
