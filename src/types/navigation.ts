import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';

export type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
};

export type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;
