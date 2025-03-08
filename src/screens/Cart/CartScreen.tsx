import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@src/styles/ThemeProvider';
import useProductStore from '@src/store/useProductStore';
import {Button, ScreenWrapper} from '@src/components';
import {
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ChevronLeft,
} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList, CartItem} from '@src/types';

const CartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const {cart, updateCartItemQuantity, removeFromCart} = useProductStore();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const renderCartItem = (item: CartItem) => (
    <View
      style={[styles.cartItem, {borderBottomColor: theme.colors.neutral[100]}]}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text
          style={[styles.productTitle, {color: theme.colors.black}]}
          numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.productDetails}>
          <Text style={[styles.price, {color: theme.colors.black}]}>
            ${item.price}
          </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                {backgroundColor: theme.colors.neutral[50]},
              ]}
              onPress={() =>
                updateCartItemQuantity(item.id, Math.max(1, item.quantity - 1))
              }>
              <Minus size={16} color={theme.colors.sapphire} />
            </TouchableOpacity>
            <Text style={[styles.quantity, {color: theme.colors.black}]}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                {backgroundColor: theme.colors.neutral[50]},
              ]}
              onPress={() =>
                updateCartItemQuantity(item.id, item.quantity + 1)
              }>
              <Plus size={16} color={theme.colors.sapphire} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.deleteButton,
                {backgroundColor: theme.colors.error[50]},
              ]}
              onPress={() => removeFromCart(item.id)}>
              <Trash2 size={20} color={theme.colors.error[600]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (cart.length === 0) {
    return (
      <ScreenWrapper>
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color={theme.colors.neutral[300]} />
          <Text style={[styles.emptyTitle, {color: theme.colors.black}]}>
            Your cart is empty
          </Text>
          <Text
            style={[styles.emptySubtitle, {color: theme.colors.neutral[400]}]}>
            Browse our products and find something you like
          </Text>
          <Button
            title="Start Shopping"
            buttonTheme="primary"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'MainTabs',
                    params: {screen: 'ShopTab'},
                  },
                ],
              })
            }
          />
        </View>
      </ScreenWrapper>
    );
  }

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
          Cart
        </Text>
      </View>

      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            renderItem={({item}) => renderCartItem(item)}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cartList}
            showsVerticalScrollIndicator={false}
          />
          <View
            style={[
              styles.footer,
              {borderTopColor: theme.colors.neutral[100]},
            ]}>
            <View style={styles.totalContainer}>
              <Text
                style={[styles.totalLabel, {color: theme.colors.neutral[400]}]}>
                Total
              </Text>
              <Text style={[styles.totalAmount, {color: theme.colors.black}]}>
                ${totalAmount.toFixed(2)}
              </Text>
            </View>
            <Button
              title="Proceed to Checkout"
              buttonTheme="primary"
              onPress={() => navigation.navigate('Checkout')}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={64} color={theme.colors.neutral[300]} />
          <Text style={[styles.emptyTitle, {color: theme.colors.black}]}>
            Your cart is empty
          </Text>
          <Text
            style={[styles.emptySubtitle, {color: theme.colors.neutral[400]}]}>
            Browse our products and find something you like
          </Text>
          <Button
            title="Start Shopping"
            buttonTheme="primary"
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'MainTabs',
                    params: {screen: 'ShopTab'},
                  },
                ],
              })
            }
          />
        </View>
      )}
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
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    gap: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    padding: 6,
    borderRadius: 6,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    minWidth: 24,
    textAlign: 'center',
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    marginBottom: 10,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default CartScreen;
