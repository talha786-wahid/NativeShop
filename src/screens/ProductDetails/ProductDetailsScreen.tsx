import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Heart, ChevronLeft, Share2} from 'lucide-react-native';
import {RootStackParamList} from '@src/types';
import {useTheme} from '@src/styles/ThemeProvider';
import useProductStore from '@src/store/useProductStore';
import {Button, ScreenWrapper} from '@src/components';

const {width} = Dimensions.get('window');

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const {fetchProductById, addToCart, toggleWishlist, wishlist} =
    useProductStore();
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isInWishlist = product && wishlist.some(item => item.id === product.id);

  useEffect(() => {
    const loadProduct = async () => {
      const productData = await fetchProductById(route.params.productId);
      if (productData) {
        setProduct(productData);
        if (productData.sizes?.length) {
          setSelectedSize(productData.sizes[0]);
        }
        if (productData.colors?.length) {
          setSelectedColor(productData.colors[0]);
        }
      }
    };
    loadProduct();
  }, [fetchProductById, route.params.productId]);

  if (!product) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer} />
      </ScreenWrapper>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1, selectedSize, selectedColor);
    // You could show a success message here
  };

  const renderHeader = () => (
    <View style={[styles.header, {backgroundColor: theme.colors.white}]}>
      <TouchableOpacity
        style={[styles.headerButton, {backgroundColor: theme.colors.white}]}
        onPress={() => navigation.goBack()}>
        <ChevronLeft size={24} color={theme.colors.black} />
      </TouchableOpacity>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: theme.colors.white}]}
          onPress={() => toggleWishlist(product)}>
          <Heart
            size={24}
            color={
              isInWishlist ? theme.colors.error[600] : theme.colors.limeGreen
            }
            fill={isInWishlist ? theme.colors.error[600] : 'none'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.headerButton, {backgroundColor: theme.colors.white}]}>
          <Share2 size={24} color={theme.colors.limeGreen} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderImageSlider = () => (
    <View style={styles.imageSliderContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={e => {
          const offset = e.nativeEvent.contentOffset.x;
          setCurrentImageIndex(Math.round(offset / width));
        }}
        scrollEventThrottle={16}>
        <Image
          source={{uri: product.image}}
          style={styles.productImage}
          resizeMode="cover"
        />
      </ScrollView>
      <View style={styles.pagination}>
        <View
          style={[
            styles.paginationDot,
            {backgroundColor: theme.colors.primary[600]},
          ]}
        />
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderImageSlider()}
          <View style={styles.detailsContainer}>
            <Text style={[styles.title, {color: theme.colors.black}]}>
              {product.title}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={[styles.rating, {color: theme.colors.black}]}>
                ⭐ {product.rating.rate}
              </Text>
              <Text
                style={[styles.reviews, {color: theme.colors.neutral[400]}]}>
                ({product.rating.count} reviews)
              </Text>
            </View>
            <Text style={[styles.price, {color: theme.colors.black}]}>
              ${product.price}
            </Text>
            <Text
              style={[styles.description, {color: theme.colors.neutral[600]}]}>
              {product.description}
            </Text>

            {product.sizes && (
              <View style={styles.optionsContainer}>
                <Text style={[styles.optionTitle, {color: theme.colors.black}]}>
                  Select Size
                </Text>
                <View style={styles.optionsGrid}>
                  {product.sizes.map((size: string) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.optionButton,
                        {
                          backgroundColor:
                            selectedSize === size
                              ? theme.colors.primary[600]
                              : theme.colors.neutral[50],
                        },
                      ]}
                      onPress={() => setSelectedSize(size)}>
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color:
                              selectedSize === size
                                ? theme.colors.white
                                : theme.colors.black,
                          },
                        ]}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {product.colors && (
              <View style={styles.optionsContainer}>
                <Text style={[styles.optionTitle, {color: theme.colors.black}]}>
                  Select Color
                </Text>
                <View style={styles.optionsGrid}>
                  {product.colors.map((color: string) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.colorButton,
                        {
                          backgroundColor: color,
                          borderWidth: selectedColor === color ? 2 : 0,
                          borderColor: theme.colors.primary[600],
                        },
                      ]}
                      onPress={() => setSelectedColor(color)}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <View
          style={[styles.footer, {borderTopColor: theme.colors.neutral[100]}]}>
          <View style={styles.priceContainer}>
            <Text
              style={[styles.priceLabel, {color: theme.colors.neutral[400]}]}>
              Price
            </Text>
            <Text style={[styles.price, {color: theme.colors.black}]}>
              ${product?.price}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Add to Cart"
                buttonTheme="light"
                onPress={handleAddToCart}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Buy Now"
                buttonTheme="primary"
                onPress={() => {
                  handleAddToCart();
                  navigation.navigate('Checkout');
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 16,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageSliderContainer: {
    height: width,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width,
    height: width,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  detailsContainer: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
  },
  reviews: {
    fontSize: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 8,
    marginTop: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 48,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
  },
  priceContainer: {
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  button: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailsScreen;
