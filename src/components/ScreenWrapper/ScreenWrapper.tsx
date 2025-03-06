import React from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';
import {StyleSheet, ActivityIndicator, View} from 'react-native';
import {Theme} from '@src/types';
import {useTheme} from '@src/styles/ThemeProvider';

interface ScreenWrapperProps extends SafeAreaViewProps {
  children: React.ReactNode;
  edges?: SafeAreaViewProps['edges'];
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  edges = ['top', 'left', 'right'],
  style,
  loading = false,
  variant = 'primary',
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.container, styles[variant], style]}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary[600]} />
        </View>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    primary: {
      backgroundColor: theme.colors.white,
    },
    secondary: {
      backgroundColor: theme.colors.neutral[50],
    },
    loaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default ScreenWrapper;
