import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Search, Filter, ShoppingCart} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types';
import {useTheme} from '@src/styles/ThemeProvider';
import {ProductCard, ScreenWrapper} from '@src/components';
import useProductStore from '@src/store/useProductStore';

const StoreScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const {products, cart, fetchProducts, isLoading} = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = Array.from(
    new Set(products.map(product => product.category)),
  );

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderHeader = () => (
    <View style={[styles.header, {backgroundColor: theme.colors.white}]}>
      <View
        style={[
          styles.searchContainer,
          {backgroundColor: theme.colors.neutral[50]},
        ]}>
        <Search size={20} color={theme.colors.neutral[400]} />
        <TextInput
          style={[styles.searchInput, {color: theme.colors.black}]}
          placeholder="Search products..."
          placeholderTextColor={theme.colors.neutral[400]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <TouchableOpacity
        style={[styles.iconButton, {backgroundColor: theme.colors.neutral[50]}]}
        onPress={() => setShowFilters(!showFilters)}>
        <Filter size={20} color={theme.colors.limeGreen} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.iconButton, {backgroundColor: theme.colors.neutral[50]}]}
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

  const renderCategories = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesList}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            {
              backgroundColor:
                selectedCategory === category
                  ? theme.colors.limeGreen
                  : theme.colors.white,
              borderColor:
                selectedCategory === category
                  ? theme.colors.limeGreen
                  : theme.colors.neutral[200],
            },
          ]}
          onPress={() =>
            setSelectedCategory(selectedCategory === category ? null : category)
          }>
          <Text
            style={[
              styles.categoryText,
              {
                color:
                  selectedCategory === category
                    ? theme.colors.white
                    : theme.colors.neutral[600],
              },
            ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
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
      <View>
        {renderHeader()}
        {showFilters && renderCategories()}
        <FlatList
          data={filteredProducts}
          renderItem={({item}) => <ProductCard product={item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.productGrid}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
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
  categoriesList: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    height: 35,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  productGrid: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  productList: {
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StoreScreen;
