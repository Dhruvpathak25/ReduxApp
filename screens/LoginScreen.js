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
import {login} from '../redux/actions/authActions';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import Icon from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state => state.auth.users);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleBack = () => {
    navigation.navigate('Welcome');
  };

  const checkCredentials = () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (isValid) {
      const matchedUser = users.find(
        user => user.email === email && user.password === password,
      );

      if (matchedUser) {
        dispatch(login(matchedUser));
        Alert.alert('Welcome!', `Welcome ${matchedUser.fullName}!`);
        navigation.navigate('Home');
      } else {
        Alert.alert(
          'Invalid credentials',
          'Please check your email and password.',
        );
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
              source={require('../assets/images/login.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.whiteContainer}>
            <Text style={styles.title}>Login</Text>
            <CustomInput
              title="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={text => setEmail(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              error={emailError}
            />
            <View style={styles.eyecontainer}>
              <CustomInput
                title="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={!showPassword}
                error={passwordError}
              />
              <Icon
                name={showPassword ? 'eye-with-line' : 'eye'}
                size={24}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>
            <Button title="Login" onPress={checkCredentials} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <SafeAreaView
        style={{
          flex: -1,
          flexDirection: 'row',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 15,
          padding: 0,
          bottom: 0,
        }}>
        <Text style={styles.account}>Create Account!</Text>
        <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      </SafeAreaView>
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
    backgroundColor: '#ACC3FF',
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
    height: '50%',
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
  icon: {position: 'absolute', right: 10, top: 40},
  account: {
    fontSize: 20,
    paddingTop: 10,
    fontFamily: 'DaysOne-Regular',
  },
  image: {
    width: '67%',
    height: '40%',
    objectFit: 'cover',
    overflow: 'hidden',
  },
});

export default LoginScreen;
