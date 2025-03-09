import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Platform,
  Image,
} from 'react-native';
import {useTheme} from '@src/styles/ThemeProvider';
import {Button} from '@src/components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types';

const {width} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070',
    title: 'Discover your\nLuxury Fashion\nStyle!',
    subtitle: 'Explore our curated collection of premium fashion items',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071',
    title: 'Shop with\nConfidence',
    subtitle: 'Secure payments and premium quality guaranteed',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070',
    title: 'Fast & Free\nDelivery',
    subtitle: 'Get your favorite items delivered to your doorstep',
  },
];

const OnboardingScreen = () => {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = (index: number) => {
    if (slidesRef.current) {
      slidesRef.current.scrollToIndex({index});
    }
  };

  const renderSlide = ({item, index}: any) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const imageScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    return (
      <View style={styles.slide}>
        <Animated.View
          style={[styles.imageContainer, {transform: [{scale: imageScale}]}]}>
          <Image
            source={{uri: item.image}}
            style={styles.image}
            resizeMode="cover"
          />
          <View
            style={[
              styles.overlay,
              {backgroundColor: theme.colors.sapphire, opacity: 0.3},
            ]}
          />
        </Animated.View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, {color: theme.colors.black}]}>
            {item.title}
          </Text>
          <Text style={[styles.subtitle, {color: theme.colors.neutral[400]}]}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  backgroundColor: theme.colors.sapphire,
                  opacity,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const handleGetStarted = () => {
    // Navigate to Home
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainTabs',
          params: {screen: 'HomeTab'},
        },
      ],
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.white}]}>
      <FlatList
        ref={slidesRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
      />
      <Pagination />
      <View style={styles.footer}>
        {currentIndex < slides.length - 1 ? (
          <View style={styles.buttonContainer}>
            <Button
              title="Skip"
              buttonTheme="light"
              onPress={handleGetStarted}
            />
            <Button
              title="Next"
              buttonTheme="primary"
              onPress={() => scrollTo(currentIndex + 1)}
            />
          </View>
        ) : (
          <Button
            title="Get Started"
            buttonTheme="primary"
            onPress={handleGetStarted}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    padding: 40,
    paddingTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    marginBottom: 12,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
});

export default OnboardingScreen;
