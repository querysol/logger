import React, { ReactElement } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import type { SearchProps } from './SearchProps';

const Search = (props: SearchProps): ReactElement => {
  const [text, onChangeText] = React.useState('');
  const { onSearch } = props;

  const onHandleChangeText = (searchKey: string) => {
    onChangeText(searchKey);
    onSearch(searchKey);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onHandleChangeText}
        value={text}
        placeholder="Search..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
});

export default Search;
