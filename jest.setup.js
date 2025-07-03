/* eslint-disable no-undef */
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
    PanGestureHandler: View,
    BaseButton: View,
    State: {},
  };
});

jest.mock('react-native-reanimated', () => {
  return {
    default: {
      call: () => {},
      createAnimatedComponent: component => component,
      event: () => {},
      add: (...args) => args[0],
      sub: (...args) => args[0],
      multiply: (...args) => args[0],
      divide: (...args) => args[0],
      interpolate: () => {},
      Value: jest.fn(),
      View: require('react-native').View,
      Extrapolate: {CLAMP: jest.fn()},
      Transition: {
        Together: 'Together',
        Out: 'Out',
        In: 'In',
      },
    },
    Value: jest.fn(),
    View: require('react-native').View,
  };
});

// Mock the navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      replace: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock Toast
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
  setRef: jest.fn(),
}));
