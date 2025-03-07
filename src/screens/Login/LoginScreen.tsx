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

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const theme = useTheme();
  const styles = createStyles(theme);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({email: '', password: ''});

  const validateInputs = () => {
    let valid = true;
    let newErrors = {email: '', password: ''};

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    console.log('errors', errors);
    if (validateInputs()) {
      Alert.alert('Success', 'Logged in successfully');
      // Proceed with authentication logic
    }
  };

  const handleRegisterRedirect = () => {
    navigation.navigate('Signup');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.loginHeaderBox}>
          <Text style={styles.loginHeaderTitle}>Sign in to your Account</Text>
          <Text style={styles.loginHeaderSubTitle}>
            Welcome back! Please sign in to continue.
          </Text>
        </View>
        <View style={styles.loginFormContainer}>
          <Input
            placeholder="Enter email address..."
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
          />
          <Input
            placeholder="Enter password..."
            type="password"
            value={password}
            onChange={setPassword}
            error={errors.password}
          />
          <Text style={styles.forgetPassword}>Forget Password?</Text>
          <Button buttonTheme="primary" title="Login" onPress={handleLogin} />
        </View>
        <View>
          <Text style={styles.orCreateAccount}>Or login with</Text>
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
          <TouchableOpacity onPress={handleRegisterRedirect}>
            <Text style={styles.orCreateAccount}>Create an account</Text>
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
    loginHeaderBox: {
      backgroundColor: theme.colors.sapphire,
      height: height * 0.35,
      width: '100%',
      paddingTop: 50,
      paddingLeft: 30,
      justifyContent: 'center',
    },
    loginHeaderTitle: {
      color: theme.colors.white,
      fontSize: 50,
      fontWeight: '600',
    },
    loginHeaderSubTitle: {
      paddingTop: 10,
      color: theme.colors.white,
      fontSize: 18,
    },
    loginFormContainer: {
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
    forgetPassword: {
      fontSize: 16,
      textAlign: 'right',
    },
    orCreateAccount: {textAlign: 'center', paddingTop: 30, paddingBottom: 30},
  });

export default LoginScreen;
