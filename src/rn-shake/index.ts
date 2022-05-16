import { NativeEventEmitter, NativeModules } from 'react-native';

const _eventEmitter = new NativeEventEmitter(NativeModules.RNShakeEvent);

export const RNshake = {
  addListener: (callback: () => void | undefined) => {
    const _subscription = _eventEmitter.addListener('ShakeEvent', () => {
      callback?.();
    });

    return _subscription;
  },

  removeAllListeners: () => _eventEmitter.removeAllListeners('ShakeEvent'),
};
