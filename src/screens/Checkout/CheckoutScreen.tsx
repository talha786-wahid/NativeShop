import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardTypeOptions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ChevronLeft, CreditCard} from 'lucide-react-native';
import {RootStackParamList} from '@src/types';
import {useTheme} from '@src/styles/ThemeProvider';
import useProductStore from '@src/store/useProductStore';
import {Button, Input, ScreenWrapper} from '@src/components';
import {showToast} from '@src/utils/toast';

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  [key: string]: string;
}

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  secureTextEntry?: boolean;
}

const CheckoutScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const {cart, clearCart} = useProductStore();
  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CheckoutForm, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      showToast.error('Error', 'Please fill in all required fields');
      return;
    }

    const orderId = Math.random().toString(36).substring(2, 15);
    const totalAmount = calculateTotal();

    // Show success toast immediately when order is placed
    showToast.success('Order Placed Successfully', `Order ID: ${orderId}`);

    // Clear cart and navigate to success screen
    clearCart();
    navigation.replace('OrderSuccess', {
      orderDetails: {
        orderId,
        totalAmount,
        items: cart,
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
      },
    });
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity
          style={[
            styles.backButton,
            {backgroundColor: theme.colors.neutral[50]},
          ]}
          onPress={() => navigation.goBack()}>
          <ChevronLeft size={24} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: theme.colors.black}]}>
          Checkout
        </Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.black}]}>
            Contact Information
          </Text>
          <Input
            label="Full Name"
            value={formData.fullName}
            onChange={value => handleInputChange('fullName', value)}
            placeholder="Enter your full name"
            error={errors.fullName}
          />
          <Input
            label="Email"
            value={formData.email}
            onChange={value => handleInputChange('email', value)}
            placeholder="Enter your email"
            error={errors.email}
            keyboardType="email-address"
          />
          <Input
            label="Phone"
            value={formData.phone}
            onChange={value => handleInputChange('phone', value)}
            placeholder="Enter your phone number"
            error={errors.phone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.black}]}>
            Shipping Address
          </Text>
          <Input
            label="Address"
            value={formData.address}
            onChange={value => handleInputChange('address', value)}
            placeholder="Enter your address"
            error={errors.address}
          />
          <Input
            label="City"
            value={formData.city}
            onChange={value => handleInputChange('city', value)}
            placeholder="Enter your city"
            error={errors.city}
          />
          <Input
            label="ZIP Code"
            value={formData.zipCode}
            onChange={value => handleInputChange('zipCode', value)}
            placeholder="Enter ZIP code"
            error={errors.zipCode}
            keyboardType="numeric"
            maxLength={5}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, {color: theme.colors.black}]}>
            Payment Details
          </Text>
          <View style={styles.cardSection}>
            <CreditCard size={24} color={theme.colors.neutral[400]} />
            <Text style={[styles.cardText, {color: theme.colors.neutral[600]}]}>
              Credit/Debit Card
            </Text>
          </View>
          <Input
            label="Card Number"
            value={formData.cardNumber}
            onChange={value => handleInputChange('cardNumber', value)}
            placeholder="Enter card number"
            error={errors.cardNumber}
            keyboardType="numeric"
            maxLength={16}
          />
          <Input
            label="Expiry Date"
            value={formData.expiryDate}
            onChange={value => handleInputChange('expiryDate', value)}
            placeholder="MM/YY"
            error={errors.expiryDate}
            maxLength={5}
          />
          <Input
            label="CVV"
            value={formData.cvv}
            onChange={value => handleInputChange('cvv', value)}
            placeholder="Enter CVV"
            error={errors.cvv}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
          />
        </View>
      </ScrollView>

      <View
        style={[styles.footer, {borderTopColor: theme.colors.neutral[100]}]}>
        <View style={styles.totalContainer}>
          <Text style={[styles.totalLabel, {color: theme.colors.neutral[400]}]}>
            Total
          </Text>
          <Text style={[styles.totalAmount, {color: theme.colors.black}]}>
            ${calculateTotal().toFixed(2)}
          </Text>
        </View>
        <Button
          title="Place Order"
          buttonTheme="primary"
          onPress={handlePlaceOrder}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
