import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../redux/actions/authActions';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Entypo';

const SignUpScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleBack = () => {
    navigation.navigate('Login');
  };

  const validation = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (fullName.trim() === '') {
      setFullNameError('Full Name Required');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Email required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address');
      isValid = false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Must be at least 8 characters, at least one uppercase, lowercase, and one digit.',
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (isValid) {
      const isEmailExists = users.some(user => user.email === email);

      if (isEmailExists) {
        setEmailError('Email is already registered');
        isValid = false;
      } else {
        const newUser = {fullName, email, password};
        dispatch(signUp(newUser));

        navigation.navigate('Login');
        Alert.alert('Account Created', `${fullName} got the access!`);
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <View style={styles.purpleContainer}>
            <View style={{position: 'absolute', top: '7%', left: '5%'}}>
              <Button onPress={handleBack} withBackIcon />
            </View>
            <Image
              source={require('../assets/images/signup.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.whiteContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>Get Your Access</Text>
              <CustomInput
                title="Full Name"
                placeholder="Enter your full name"
                value={fullName}
                onChangeText={text => {
                  setFullName(text);
                  setFullNameError('');
                }}
                error={fullNameError}
                autoCapitalize="words"
              />
              <CustomInput
                title="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setEmailError('');
                }}
                error={emailError}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View style={styles.eyecontainer}>
                <CustomInput
                  title="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setPasswordError('');
                  }}
                  error={passwordError}
                  secureTextEntry={!showPassword}
                />
                <Icon
                  name={showPassword ? 'eye-with-line' : 'eye'}
                  size={24}
                  color="#aaa"
                  style={{position: 'absolute', right: 10, top: 40}}
                  onPress={toggleShowPassword}
                />
              </View>
              <View style={styles.eyecontainer}>
                <CustomInput
                  title="Confirm Password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={text => {
                    setConfirmPassword(text);
                    setConfirmPasswordError('');
                  }}
                  error={confirmPasswordError}
                  secureTextEntry={!showConfirmPassword}
                />
                <Icon
                  name={showConfirmPassword ? 'eye-with-line' : 'eye'}
                  size={24}
                  color="#aaa"
                  style={{position: 'absolute', right: 10, top: 40}}
                  onPress={toggleShowConfirmPassword}
                />
              </View>
              <Button
                title="Create Account"
                onPress={validation}
                withBackIcon={false}
              />
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  purpleContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D8D6FE',
    paddingTop: '20%',
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 10,
  },
  whiteContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
    width: '100%',
    height: '62%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'DaysOne-Regular',
  },
  eyecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '65%',
    height: '30%',
    objectFit: 'cover',
    overflow: 'hidden',
  },
});

export default SignUpScreen;
