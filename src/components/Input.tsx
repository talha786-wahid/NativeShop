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

export interface InputProps extends Omit<TextInputProps, 'onChange'> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  secureTextEntry?: boolean;
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
  ...props
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: theme.colors.primary[900]}]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error
              ? theme.colors.error[600]
              : theme.colors.neutral[200],
            color: theme.colors.primary[900],
          },
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.neutral[400]}
        keyboardType={keyboardType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
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
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default Input;
