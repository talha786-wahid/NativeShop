import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {CheckCircle2} from 'lucide-react-native';
import type {
  OrderSuccessScreenNavigationProp,
  OrderSuccessScreenRouteProp,
} from '@src/types';
import {useTheme} from '@src/styles/ThemeProvider';
import {Button, ScreenWrapper} from '@src/components';

const OrderSuccessScreen = () => {
  const route = useRoute<OrderSuccessScreenRouteProp>();
  const navigation = useNavigation<OrderSuccessScreenNavigationProp>();
  const theme = useTheme();
  const {orderDetails} = route.params;

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}>
        <View style={styles.successIcon}>
          <CheckCircle2
            size={64}
            color={theme.colors.sapphire}
            fill={theme.colors.primary[50]}
          />
        </View>
        <Text style={[styles.title, {color: theme.colors.black}]}>
          Order Confirmed!
        </Text>
        <Text style={[styles.subtitle, {color: theme.colors.neutral[600]}]}>
          Your order has been confirmed and will be shipped soon.
        </Text>

        <View
          style={[styles.card, {backgroundColor: theme.colors.neutral[50]}]}>
          <Text style={[styles.cardTitle, {color: theme.colors.black}]}>
            Order Details
          </Text>
          <View style={styles.detailRow}>
            <Text style={[styles.label, {color: theme.colors.neutral[600]}]}>
              Order ID
            </Text>
            <Text style={[styles.value, {color: theme.colors.black}]}>
              #{orderDetails.orderId}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.label, {color: theme.colors.neutral[600]}]}>
              Total Amount
            </Text>
            <Text style={[styles.value, {color: theme.colors.black}]}>
              ${orderDetails.totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>

        <View
          style={[styles.card, {backgroundColor: theme.colors.neutral[50]}]}>
          <Text style={[styles.cardTitle, {color: theme.colors.black}]}>
            Shipping Address
          </Text>
          <Text style={[styles.address, {color: theme.colors.black}]}>
            {orderDetails.shippingAddress.fullName}
          </Text>
          <Text style={[styles.address, {color: theme.colors.neutral[600]}]}>
            {orderDetails.shippingAddress.address}
          </Text>
          <Text style={[styles.address, {color: theme.colors.neutral[600]}]}>
            {orderDetails.shippingAddress.city},{' '}
            {orderDetails.shippingAddress.zipCode}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Continue Shopping"
            buttonTheme="primary"
            onPress={() => navigation.navigate('HomeTab')}
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="View Orders"
            buttonTheme="light"
            onPress={() => navigation.navigate('ProfileTab')}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  address: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 24,
    gap: 12,
  },
  buttonSpacer: {
    height: 8,
  },
});

export default OrderSuccessScreen;
