import React, { ReactElement } from 'react';
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import type { SendMailProps } from './SendMail.types';

const SendMail = (props: SendMailProps): ReactElement => {
  const [text, onChangeText] = React.useState('');
  const { onSendClick } = props;

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="mail address"
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onSendClick(text);
        }}
      >
        <Text style={styles.text}>Send Mail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#38adde',
    padding: 20,
  },
  text: {
    textAlign: 'center',
  },
});

export default SendMail;
