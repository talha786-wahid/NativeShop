import {create} from 'zustand';
import {Product, CartItem} from '@src/types';
import {showToast} from '@src/utils/toast';

interface ProductStore {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<Product | undefined>;
  addToCart: (
    product: Product,
    quantity: number,
    size?: string,
    color?: string,
  ) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  cart: [],
  wishlist: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({isLoading: true, error: null});
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      set({products: data, isLoading: false});
    } catch (error: any) {
      set({error: error.message, isLoading: false});
      showToast.error('Error', 'Failed to fetch products');
    }
  },

  fetchProductById: async (id: number) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error: any) {
      showToast.error('Error', 'Failed to fetch product details');
      return undefined;
    }
  },

  addToCart: (
    product: Product,
    quantity: number,
    size?: string,
    color?: string,
  ) => {
    const cart = get().cart;
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id
          ? {...item, quantity: item.quantity + quantity}
          : item,
      );
      set({cart: updatedCart});
      showToast.success('Updated', 'Item quantity updated in cart');
    } else {
      set({
        cart: [
          ...cart,
          {...product, quantity, selectedSize: size, selectedColor: color},
        ],
      });
      showToast.success('Added to Cart', 'Item added successfully');
    }
  },

  removeFromCart: (productId: number) => {
    const cart = get().cart;
    set({cart: cart.filter(item => item.id !== productId)});
    showToast.info('Removed', 'Item removed from cart');
  },

  updateCartItemQuantity: (productId: number, quantity: number) => {
    const cart = get().cart;
    if (quantity === 0) {
      set({cart: cart.filter(item => item.id !== productId)});
      showToast.info('Removed', 'Item removed from cart');
    } else {
      const updatedCart = cart.map(item =>
        item.id === productId ? {...item, quantity} : item,
      );
      set({cart: updatedCart});
      showToast.success('Updated', 'Cart quantity updated');
    }
  },

  toggleWishlist: (product: Product) => {
    const wishlist = get().wishlist;
    const isInWishlist = wishlist.some(item => item.id === product.id);

    if (isInWishlist) {
      set({wishlist: wishlist.filter(item => item.id !== product.id)});
      showToast.info('Removed', 'Item removed from wishlist');
    } else {
      set({wishlist: [...wishlist, product]});
      showToast.success('Added', 'Item added to wishlist');
    }
  },

  clearCart: () => {
    set({cart: []});
  },
}));

export default useProductStore;
