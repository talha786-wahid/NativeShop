import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Store, Heart, User} from 'lucide-react-native';
import {useTheme} from '@src/styles/ThemeProvider';
import {StoreScreen, WishlistScreen} from '@src/screens';
import HomeScreen from '@src/screens/Home/HomeScreen';
import ProfileScreen from '@src/screens/Profile/ProfileScreen';
import useProductStore from '@src/store/useProductStore';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const theme = useTheme();
  const {wishlist} = useProductStore();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopWidth: 1,
          borderTopColor: theme.colors.neutral[100],
          height: 75,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.limeGreen,
        tabBarInactiveTintColor: theme.colors.neutral[400],
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <Home size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="ShopTab"
        component={StoreScreen}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({color, size}) => <Store size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="WishlistTab"
        component={WishlistScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({color, size}) => <Heart size={size} color={color} />,
          tabBarBadge: wishlist.length || undefined,
          tabBarBadgeStyle: {backgroundColor: theme.colors.limeGreen},
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => <User size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
