import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/actions/authActions';
import Button from '../components/Button';

const WelcomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);

  const handleNext = () => {
    navigation.navigate('Login');
  };

  const handleLogout = () => {
    dispatch(logout());
    // navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Get Started!</Text>
      <Image
        source={require('../assets/images/welcome.png')}
        style={styles.image}
      />
      <Button nextbutton style={styles.button} onPress={handleNext}>
        Continue
      </Button>

      {/* {currentUser && (
        <Button
          title="Logout"
          onPress={handleLogout}
          style={styles.logoutButton}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ACC3FF',
    width: '100%',
    height: '100%',
    paddingVertical: '10%',
  },
  title: {
    fontSize: 35,
    paddingTop: '8%',
    fontWeight: '800',
    paddingHorizontal: '2%',
    color: '#5C4FFD',
    shadowColor: '#fff',
    shadowOpacity: 3,
    fontFamily: 'DaysOne-Regular',
  },
  image: {
    width: '100%',
    height: '50%',

    objectFit: 'cover',
  },
  button: {
    color: 'white',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'red',
  },
});

export default WelcomeScreen;
