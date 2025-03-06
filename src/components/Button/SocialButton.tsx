import React from 'react';
import {GestureResponderEvent, Image} from 'react-native';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Theme} from '@src/types';
import {useTheme} from '@src/styles/ThemeProvider';

interface SocialButtonProps {
  image?: any;
  type?: 'facebook' | 'google';
  onPress: (event: GestureResponderEvent) => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({image, type, onPress}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const isFacebook = type === 'facebook';
  const text = isFacebook ? 'Facebook' : 'Google';

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.neutral[200],
      borderWidth: 2,
      borderRadius: 8,
      padding: 15,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    image: {width: 25, height: 25},
    text: {
      color: 'black',
      fontSize: 16,
    },
  });

export default SocialButton;
