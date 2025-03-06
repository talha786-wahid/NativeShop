import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Theme} from '@src/types/theme';
import {useTheme} from '@src/styles/ThemeProvider';

interface ButtonProps {
  title: string;
  buttonTheme: 'primary' | 'light' | 'white' | 'danger';
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  dataTestid?: string;
  buttonStyle?: object;
  textStyle?: object;
}

const Button = ({
  title,
  buttonTheme,
  onPress,
  loading = false,
  disabled = false,
  dataTestid,
  buttonStyle,
  textStyle,
}: ButtonProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      testID={dataTestid}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonStyles,
        buttonTheme === 'primary'
          ? styles.buttonPrimary
          : buttonTheme === 'light'
          ? styles.buttonLight
          : styles.buttonWhite,

        buttonTheme === 'primary' && disabled
          ? styles.buttonPrimaryDisabled
          : buttonTheme === 'light' && disabled
          ? styles.buttonLightDisabled
          : '',
        buttonStyle,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={
            disabled
              ? buttonTheme === 'primary'
                ? theme.colors.white
                : buttonTheme === 'light'
                ? theme.colors.neutral[400]
                : theme.colors.primary[300]
              : buttonTheme === 'primary'
              ? theme.colors.white
              : buttonTheme === 'light'
              ? theme.colors.black
              : theme.colors.primary[600]
          }
        />
      ) : (
        <Text
          style={[
            styles.buttonTitleStyles,
            disabled
              ? buttonTheme === 'primary'
                ? styles.buttonPrimaryTitleDisabled
                : buttonTheme === 'light'
                ? styles.buttonLightTitleDisabled
                : buttonTheme === 'danger'
                ? styles.buttonLightTitleDisabled
                : styles.buttonWhiteTitleDisabled
              : buttonTheme === 'primary'
              ? styles.buttonPrimaryTitle
              : buttonTheme === 'light'
              ? styles.buttonLightTitle
              : buttonTheme === 'danger'
              ? styles.buttonDangerTitle
              : styles.buttonWhiteTitle,

            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    buttonStyles: {
      width: '100%',
      height: 'auto',
      paddingVertical: 14,
      borderRadius: 8,
    },
    buttonTitleStyles: {
      margin: 'auto',
      fontSize: theme.fontSize.h3,
      fontFamily: theme.fonts.medium,
      fontWeight: 600,
    },
    buttonPrimaryDisabled: {
      backgroundColor: theme.colors.primary[300],
    },
    buttonLightDisabled: {
      backgroundColor: theme.colors.neutral[50],
    },

    buttonPrimary: {
      backgroundColor: theme.colors.limeGreen,
    },
    buttonLight: {
      backgroundColor: theme.colors.neutral[50],
    },

    buttonWhite: {
      backgroundColor: theme.colors.white,
    },

    buttonPrimaryTitle: {
      color: theme.colors.black,
    },
    buttonLightTitle: {
      color: theme.colors.black,
    },
    buttonDangerTitle: {
      color: theme.colors.error[600],
    },
    buttonWhiteTitle: {
      color: theme.colors.primary[600],
    },

    buttonPrimaryTitleDisabled: {
      color: theme.colors.white,
    },
    buttonLightTitleDisabled: {
      color: theme.colors.neutral[400],
    },
    buttonWhiteTitleDisabled: {
      color: theme.colors.primary[300],
    },
    buttonDangerTitleDisabled: {
      color: theme.colors.error[300],
    },
  });

export default Button;
