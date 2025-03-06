import React from 'react';
import Input from './Input';

interface PasswordProps {
  value: string;
  label: string;
  error?: string;
  onChange: (text: string) => void;
  onBlur?: () => void;
  visible?: boolean;
}

const Password = ({
  value,
  label,
  error,
  onChange,
  onBlur,
  visible: externalVisibility,
}: PasswordProps) => {
  const visible = externalVisibility ?? false;

  return (
    <Input
      label={label}
      value={value}
      visible={visible}
      required
      type="password"
      error={error}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Password;
