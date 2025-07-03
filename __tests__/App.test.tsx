/**
 * @format
 */

import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
    PanGestureHandler: View,
    BaseButton: View,
    State: {},
  };
});

describe('App', () => {
  it('renders correctly', () => {
    const {toJSON} = render(<App />);
    expect(toJSON()).toBeTruthy();
  });
});
