import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useTheme} from '@src/styles/ThemeProvider';
import {Button} from '@src/components';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types';
import {CheckCircle2} from 'lucide-react-native';
import Toast from 'react-native-toast-message';

type OrderSuccessScreenRouteProp = RouteProp<
  RootStackParamList,
  'OrderSuccess'
>;

const OrderSuccessScreen = () => {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<OrderSuccessScreenRouteProp>();
  const {orderDetails} = route.params;

  const handleContinueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainTabs',
          params: {screen: 'HomeTab'},
        },
      ],
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.white}]}>
      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            {backgroundColor: theme.colors.sapphire},
          ]}>
          <CheckCircle2 size={64} color={theme.colors.white} />
        </View>
        <Text style={[styles.title, {color: theme.colors.black}]}>
          Order Successful!
        </Text>
        <Text style={[styles.subtitle, {color: theme.colors.neutral[400]}]}>
          Your order has been placed successfully.
        </Text>
        <Text style={[styles.orderInfo, {color: theme.colors.neutral[500]}]}>
          Order ID: {orderDetails.orderId}
        </Text>
        <Text style={[styles.amount, {color: theme.colors.sapphire}]}>
          Total Amount: ${orderDetails.totalAmount.toFixed(2)}
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue Shopping"
          buttonTheme="primary"
          onPress={handleContinueShopping}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  orderInfo: {
    fontSize: 14,
    marginTop: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default OrderSuccessScreen;
