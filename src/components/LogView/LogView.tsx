import React, { useState, useEffect, ReactElement } from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Tabs from '../Tabs/Tabs';
import Search from '../Search/Search';
import SendMail from '../SendMail/SendMail';
import { NGLogger } from '../../classes/nglogger';

const LogView = (): ReactElement => {
  const [logData, setLogData] = useState<string[]>([]);
  const [logDataDisplay, setLogDataDisplay] = useState<string[]>();
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowSendMail, setIsShowSendMail] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const logger = NGLogger.getInstance();

  useEffect(() => {
    setLogDataDisplay(logData);
  }, [logData]);

  useEffect(() => {
    logger.readLog().then((logText) => {
      setLogData(logText.split('\n'));
    });
  }, []);

  const onSearch = (searchKey: string) => {
    const afterFilter = logData.length
      ? logData.filter((logItem: string) => {
          const item = String(logItem).toLowerCase();
          const valSearched = searchKey.toLowerCase();
          return item.includes(valSearched);
        })
      : [];

    setLogDataDisplay(afterFilter);
  };

  const onSendClick = (sendValue: string) => {
    sendMail(sendValue, 'logs from app', logData.join()).then(() => {});
  };

  const sendMail = (to: string, subject: string, body: string) => {
    let url = `mailto:${to}`;
    var qs = require('qs');
    // Create email link query
    const query = qs.stringify({
      subject: subject,
      body: body,
    });

    if (query.length) {
      url += `?${query}`;
    }

    return Linking.openURL(url);
  };

  const clearHandle = () => {
    logger.deleteLogFile();
    setLogData([]);
    setIsShowSearch(false);
    setIsShowSendMail(false);
    setIsClear(true);
  };

  const sendHandle = () => {
    setIsShowSearch(false);
    setIsShowSendMail(true);
    setIsClear(false);
  };

  const searchHandle = () => {
    setIsShowSearch(true);
    setIsShowSendMail(false);
    setIsClear(false);
  };

  return (
    <SafeAreaView style={styles.app}>
      <Tabs
        isClear={isClear}
        isShowSearch={isShowSearch}
        isShowSendMail={isShowSendMail}
        clearHandle={clearHandle}
        sendHandle={sendHandle}
        searchHandle={searchHandle}
      />
      {(isShowSearch || isShowSendMail) && (
        <View style={styles.showTabsInfo}>
          {isShowSearch && <Search onSearch={onSearch} />}
          {isShowSendMail && <SendMail onSendClick={onSendClick} />}
        </View>
      )}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}
      >
        <View>
          <Text>{logDataDisplay || 'no logs'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    padding: 20,
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    height: 80,
  },
  scroll: {
    marginTop: 20,
  },
  showTabsInfo: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
  },
});

export default LogView;
