import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, SignUpScreen} from '@src/screens';
import ProductDetailsScreen from '@src/screens/ProductDetails/ProductDetailsScreen';
import CartScreen from '@src/screens/Cart/CartScreen';
import CheckoutScreen from '@src/screens/Checkout/CheckoutScreen';
import OrderSuccessScreen from '@src/screens/OrderSuccess/OrderSuccessScreen';
import TabNavigator from './TabNavigator';
import {RootStackParamList} from '@src/types';
import {StoreScreen} from '@src/screens';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="ShopTab" component={StoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
