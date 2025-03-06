import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Theme} from '@src/types';
import {useTheme} from '@src/styles/ThemeProvider';

interface InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password';
  value?: string;
  visible?: boolean;
  error?: string;
  onChange?: (text: string) => void;
  onBlur?: () => void;
}

const Input = ({
  placeholder,
  type = 'text',
  visible,
  onChange,
  error,
}: InputProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const keyboardType = type === 'email' ? 'email-address' : 'default';
  const secureTextEntry = type === 'password' && !visible;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChange}
      />
      {error && <Text style={styles.error}> {error}</Text>}
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    inputContainer: {
      width: '100%',
    },
    input: {
      borderColor: theme.colors.neutral[200],
      borderWidth: 2,
      borderRadius: 8,
      padding: 15,
    },
    error: {
      paddingTop: 5,
      color: theme.colors.error[600],
    },
  });
export default Input;
