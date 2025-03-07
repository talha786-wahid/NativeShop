import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useTheme} from '@src/styles/ThemeProvider';
import useProductStore from '@src/store/useProductStore';
import {ProductCard, ScreenWrapper} from '@src/components';
import {Heart} from 'lucide-react-native';

const WishlistScreen = () => {
  const theme = useTheme();
  const {wishlist} = useProductStore();

  if (wishlist.length === 0) {
    return (
      <ScreenWrapper>
        <View style={styles.emptyContainer}>
          <Heart size={64} color={theme.colors.neutral[300]} />
          <Text style={[styles.emptyTitle, {color: theme.colors.black}]}>
            Your wishlist is empty
          </Text>
          <Text style={[styles.emptyText, {color: theme.colors.neutral[400]}]}>
            Save items you love in your wishlist and review them anytime
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.colors.black}]}>
          Wishlist
        </Text>
        <Text style={[styles.subtitle, {color: theme.colors.neutral[400]}]}>
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </Text>
      </View>
      <FlatList
        data={wishlist}
        renderItem={({item}) => <ProductCard product={item} />}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productGrid}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  productGrid: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default WishlistScreen;
