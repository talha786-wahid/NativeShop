import React, {useEffect} from 'react';
import {View, StyleSheet, Animated, Platform} from 'react-native';
import {useTheme} from '@src/styles/ThemeProvider';
import {ShoppingBag} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types';

const SplashScreen = () => {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const logoScale = new Animated.Value(0);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);
  const dotScale = new Animated.Value(0);

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Logo fade in and scale up
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Text fade in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Dot animation
      Animated.timing(dotScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to Onboarding after splash animation
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Onboarding'}],
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [logoScale, logoOpacity, textOpacity, dotScale, navigation]);

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.sapphire}]}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{scale: logoScale}],
              opacity: logoOpacity,
            },
          ]}>
          <ShoppingBag size={80} color={theme.colors.white} />
        </Animated.View>

        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.title,
              {color: theme.colors.white, opacity: textOpacity},
            ]}>
            NativeShop
          </Animated.Text>
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: theme.colors.limeGreen,
                transform: [{scale: dotScale}],
              },
            ]}
          />
        </View>

        <Animated.Text
          style={[
            styles.subtitle,
            {color: theme.colors.neutral[200], opacity: textOpacity},
          ]}>
          Your Premium Shopping Experience
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
  },
});

export default SplashScreen;
