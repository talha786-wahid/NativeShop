import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Search, ShoppingCart} from 'lucide-react-native';
import {RootStackParamList} from '@src/types';
import {useTheme} from '@src/styles/ThemeProvider';
import {ProductCard, ScreenWrapper} from '@src/components';
import useProductStore from '@src/store/useProductStore';

const BANNER_HEIGHT = 200;

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const {products, cart, fetchProducts, isLoading} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = products.slice(0, 4);
  const topDeals = products.slice(4, 8);

  const renderHeader = () => (
    <View style={[styles.header, {backgroundColor: theme.colors.white}]}>
      <TouchableOpacity
        style={[
          styles.searchButton,
          {backgroundColor: theme.colors.neutral[50]},
        ]}
        onPress={() => navigation.navigate('ShopTab')}>
        <Search size={20} color={theme.colors.neutral[400]} />
        <Text style={[styles.searchText, {color: theme.colors.neutral[400]}]}>
          Search products...
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.cartButton, {backgroundColor: theme.colors.neutral[50]}]}
        onPress={() => navigation.navigate('Cart')}>
        <ShoppingCart size={20} color={theme.colors.limeGreen} />
        {cart.length > 0 && (
          <View
            style={[styles.badge, {backgroundColor: theme.colors.limeGreen}]}>
            <Text style={[styles.badgeText, {color: theme.colors.black}]}>
              {cart.length}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.bannerContent}>
        <Text style={[styles.bannerTitle, {color: theme.colors.white}]}>
          Summer Sale
        </Text>
        <Text style={[styles.bannerSubtitle, {color: theme.colors.white}]}>
          Up to 50% off
        </Text>
        <TouchableOpacity
          style={[
            styles.bannerButton,
            {backgroundColor: theme.colors.limeGreen},
          ]}
          onPress={() => navigation.navigate('ShopTab')}>
          <Text
            style={[styles.bannerButtonText, {color: theme.colors.sapphire}]}>
            Shop Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSection = (title: string, products: any[], showSeeAll = true) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, {color: theme.colors.black}]}>
          {title}
        </Text>
        {showSeeAll && (
          <TouchableOpacity onPress={() => navigation.navigate('ShopTab')}>
            <Text style={[styles.seeAll, {color: theme.colors.sapphire}]}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <ProductCard product={item} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.productList}
      />
    </View>
  );

  if (isLoading) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.limeGreen} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      {renderHeader()}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {renderBanner()}
        {renderSection('Featured Products', featuredProducts)}
        {renderSection('Top Deals', topDeals)}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchText: {
    fontSize: 16,
  },
  cartButton: {
    padding: 12,
    borderRadius: 12,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 4,
  },
  bannerContainer: {
    height: BANNER_HEIGHT,
    marginBottom: 24,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  bannerButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  productCard: {
    marginRight: 16,
  },
  productList: {
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 80,
  },
});

export default HomeScreen;
