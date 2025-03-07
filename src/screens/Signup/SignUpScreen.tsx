import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '@src/types';
import {useNavigation} from '@react-navigation/native';
import {Theme} from '@src/types';
import {useTheme} from '@src/styles/ThemeProvider';
import {Button, Input} from '@src/components';
import {SocialButton} from '@src/components/Button';
import facebook from '@src/assets/icons/facebook.png';
import google from '@src/assets/icons/google.png';

const {height} = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const theme = useTheme();
  const styles = createStyles(theme);
  const initialVals = {
    name: '',
    email: '',
    phone: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialVals);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const validate = () => {
    let valid = true;
    let newErrors = {name: '', email: '', phone: '', password: ''};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = () => {
    if (validate()) {
      Alert.alert('Success', 'Registered successfully');
      // Proceed with authentication logic
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData({...formData, [key]: value});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.signupHeaderBox}>
          <Text style={styles.signupHeaderTitle}>Register</Text>
          <Text style={styles.signupHeaderSubTitle}>Create your account</Text>
        </View>
        <View style={styles.signupFormContainer}>
          <Input
            placeholder="Enter name..."
            type="text"
            value={formData.name}
            onChange={text => handleChange('name', text)}
            error={errors.name}
          />
          <Input
            placeholder="Enter email address..."
            type="email"
            value={formData.email}
            onChange={text => handleChange('email', text)}
            error={errors.email}
          />
          <Input
            placeholder="Enter phone number..."
            type="text"
            value={formData.phone}
            onChange={text => handleChange('phone', text)}
            error={errors.phone}
          />
          <Input
            placeholder="Enter password..."
            type="password"
            value={formData.password}
            onChange={text => handleChange('password', text)}
            error={errors.password}
          />
          <Button buttonTheme="primary" title="Signup" onPress={handleSignup} />
        </View>
        <View>
          <View style={styles.socialButtonContainer}>
            <SocialButton
              image={facebook}
              type="facebook"
              onPress={() => console.log('Facebook login')}
            />
            <SocialButton
              image={google}
              type="google"
              onPress={() => console.log('Google login')}
            />
          </View>
          <TouchableOpacity onPress={handleLoginRedirect}>
            <Text style={styles.orLogin}>Or Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    signupHeaderBox: {
      backgroundColor: theme.colors.sapphire,
      height: height * 0.35,
      width: '100%',
      paddingTop: 50,
      paddingLeft: 30,
      justifyContent: 'center',
    },
    signupHeaderTitle: {
      color: theme.colors.white,
      fontSize: 50,
      fontWeight: '600',
    },
    signupHeaderSubTitle: {
      paddingTop: 10,
      color: theme.colors.white,
      fontSize: 18,
    },
    signupFormContainer: {
      paddingTop: 50,
      paddingHorizontal: 30,
      gap: 15,
    },
    socialButtonContainer: {
      marginTop: 30,
      flexDirection: 'column',
      gap: 15,
      paddingHorizontal: 30,
    },
    orLogin: {textAlign: 'center', paddingTop: 30, paddingBottom: 30},
  });

export default SignUpScreen;
