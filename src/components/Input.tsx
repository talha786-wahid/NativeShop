import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TextInputProps,
} from 'react-native';
import {useTheme} from '@src/styles/ThemeProvider';

interface InputProps extends Omit<TextInputProps, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  keyboardType,
  maxLength,
  secureTextEntry,
  autoCapitalize,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: theme.colors.black}]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error
              ? theme.colors.error[600]
              : theme.colors.neutral[200],
            color: theme.colors.black,
          },
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.neutral[400]}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        {...props}
      />
      {error && (
        <Text style={[styles.error, {color: theme.colors.error[600]}]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
  },
});

export default Input;
