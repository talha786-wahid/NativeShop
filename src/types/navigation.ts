import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CartItem} from './index';

export type RootStackScreens =
  | 'Splash'
  | 'Onboarding'
  | 'MainTabs'
  | 'HomeTab'
  | 'ShopTab'
  | 'WishlistTab'
  | 'ProfileTab'
  | 'ProductDetails'
  | 'Cart'
  | 'Checkout'
  | 'Login'
  | 'Signup'
  | 'OrderSuccess';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  HomeTab: undefined;
  ShopTab: undefined;
  WishlistTab: undefined;
  ProfileTab: undefined;
  ProductDetails: {productId: number};
  Cart: undefined;
  Checkout: undefined;
  Login: undefined;
  Signup: undefined;
  OrderSuccess: {
    orderDetails: {
      orderId: string;
      totalAmount: number;
      items: CartItem[];
      shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        zipCode: string;
      };
    };
  };
};

export type OnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export type OrderSuccessScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'OrderSuccess'
>;

export type OrderSuccessScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'OrderSuccess'
>;

export type OrderSuccessScreenRouteProp = RouteProp<
  RootStackParamList,
  'OrderSuccess'
>;
