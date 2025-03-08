export * from './theme';
export * from './navigation';

export interface Theme {
  colors: {
    primary: {[key: number]: string};
    neutral: {[key: number]: string};
    error: {[key: number]: string};
    success: {[key: number]: string};
    sailAccent: {[key: number]: string};
    frenchLilacAccent: {[key: number]: string};
    macaroniCheeseAccent: {[key: number]: string};
    lightningYellowAccent: {[key: number]: string};
    white: string;
    black: string;
    sapphire: string;
    limeGreen: string;
  };
  fonts: {[key: string]: string};
  fontSize: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  sizes?: string[];
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  Splash: undefined;
  Onboarding: undefined;
  HomeTab: undefined;
  ShopTab: undefined;
  WishlistTab: undefined;
  ProfileTab: undefined;
  ProductDetails: {productId: number};
  Cart: undefined;
  Checkout: undefined;
  Login: undefined;
  Signup: undefined;
  OrderSuccess: {
    orderDetails: {
      orderId: string;
      totalAmount: number;
      items: CartItem[];
      shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        zipCode: string;
      };
    };
  };
};

export interface ProductStore {
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
