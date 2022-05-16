import React, { ReactNode, useEffect, useState } from 'react';
import { RNshake } from 'rn-shake';
import { NGLogger } from '../../classes/nglogger';
import LogView from '../LogView/LogView';

type Props = {
  children: JSX.Element | JSX.Element[] | React.ReactChild | React.ReactChild[];
};

const NgLoggerWrapper: ReactNode = (props: Props) => {
  const [showLog, setShowLog] = useState<boolean>(false);

  useEffect(() => {
    const toggleLogState = () => {
      return setShowLog(!showLog);
    };
    toggleLogState();
  }, [NGLogger.isShaken]);

  useEffect(() => {
    if (RNshake) {
      // RNShake.addListener(() => {
      //   console.log(123);
      //   //NGLogger.isShaken = !NGLogger.isShaken;
      // });
    }
  }, []);

  const { children } = props;

  return <>{showLog ? <LogView /> : children}</>;
};

export { NgLoggerWrapper };
