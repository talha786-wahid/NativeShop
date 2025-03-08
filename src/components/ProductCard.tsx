import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Heart, ShoppingBag} from 'lucide-react-native';
import {Product, RootStackParamList} from '@src/types';
import useProductStore from '@src/store/useProductStore';
import {useTheme} from '@src/styles/ThemeProvider';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20;

interface ProductCardProps {
  product: Product;
  showWishlist?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showWishlist = true,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const {toggleWishlist, wishlist, addToCart} = useProductStore();

  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handlePress = () => {
    navigation.navigate('ProductDetails', {productId: product.id});
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={handlePress}>
        <Image source={{uri: product.image}} style={styles.image} />
        {showWishlist && (
          <TouchableOpacity
            style={[
              styles.wishlistButton,
              {backgroundColor: theme.colors.white},
            ]}
            onPress={handleWishlist}>
            <Heart
              size={20}
              color={
                isInWishlist ? theme.colors.error[600] : theme.colors.limeGreen
              }
              fill={isInWishlist ? theme.colors.error[600] : 'none'}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <View style={styles.details}>
        <Text
          style={[styles.title, {color: theme.colors.black}]}
          numberOfLines={1}>
          {product.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={[styles.rating, {color: theme.colors.black}]}>
            ⭐ {product.rating.rate}
          </Text>
          <Text style={[styles.reviews, {color: theme.colors.neutral[400]}]}>
            ({product.rating.count})
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={[styles.price, {color: theme.colors.black}]}>
            ${product.price}
          </Text>
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              {backgroundColor: theme.colors.limeGreen},
            ]}
            onPress={handleAddToCart}>
            <ShoppingBag size={16} color={theme.colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 18,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  details: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
  },
  reviews: {
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  addToCartButton: {
    padding: 8,
    borderRadius: 8,
  },
});

export default ProductCard;
