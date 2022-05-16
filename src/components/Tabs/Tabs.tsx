import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { TabsProps } from './Tabs.types';

const Tabs = (props: TabsProps): ReactElement => {
  const {
    clearHandle,
    sendHandle,
    searchHandle,
    isClear,
    isShowSearch,
    isShowSendMail,
  } = props;

  const searchStyle = [styles.text, isShowSearch && styles.focus];
  const sendMailStyle = [styles.text, isShowSendMail && styles.focus];
  const clearStyle = [styles.text, isClear && styles.focus];

  return (
    <View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            searchHandle();
          }}
        >
          <Text style={searchStyle}>Search Log</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            sendHandle();
          }}
        >
          <Text style={sendMailStyle}>Send Mail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => clearHandle()}>
          <Text style={clearStyle}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#38adde',
    padding: 20,
    zIndex: 111,
    width: '33%',
    borderWidth: 1,
  },
  focus: {
    fontWeight: '600',
  },
  text: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
});

export default Tabs;
