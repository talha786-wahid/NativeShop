import {create} from 'zustand';
import {ProductStore, Product, CartItem} from '@src/types';

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  cart: [],
  wishlist: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({isLoading: true, error: null});
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      set({products: data, isLoading: false});
    } catch (error) {
      set({error: 'Failed to fetch products', isLoading: false});
    }
  },

  fetchProductById: async (id: number) => {
    try {
      set({isLoading: true, error: null});
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      set({isLoading: false});
      return data;
    } catch (error) {
      set({error: 'Failed to fetch product', isLoading: false});
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
    const existingItem = cart.find(
      item =>
        item.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color,
    );

    if (existingItem) {
      set({
        cart: cart.map(item =>
          item === existingItem
            ? {...item, quantity: item.quantity + quantity}
            : item,
        ),
      });
    } else {
      const cartItem: CartItem = {
        ...product,
        quantity,
        selectedSize: size,
        selectedColor: color,
      };
      set({cart: [...cart, cartItem]});
    }
  },

  removeFromCart: (productId: number) => {
    set({cart: get().cart.filter(item => item.id !== productId)});
  },

  updateCartItemQuantity: (productId: number, quantity: number) => {
    set({
      cart: get().cart.map(item =>
        item.id === productId ? {...item, quantity} : item,
      ),
    });
  },

  toggleWishlist: (product: Product) => {
    const wishlist = get().wishlist;
    const isInWishlist = wishlist.some(item => item.id === product.id);

    if (isInWishlist) {
      set({wishlist: wishlist.filter(item => item.id !== product.id)});
    } else {
      set({wishlist: [...wishlist, product]});
    }
  },

  clearCart: () => {
    set({cart: []});
  },
}));

export default useProductStore;
