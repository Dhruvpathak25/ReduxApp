import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store/store';
import {useSelector} from 'react-redux';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import {ActivityIndicator} from 'react-native';

const Stack = createStackNavigator();

function App() {
  // const currentUser = useSelector(state => state.auth.currentUser);

  const {
    auth: {currentUser},
  } = store?.getState();
  const isLoggedIn = currentUser !== null;
  console.log('🚀 ~ App ~ currentUser:', currentUser);
  console.log('🚀 ~ App ~ isLoggedIn:', isLoggedIn);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? 'Home' : 'Welcome'}
            screenOptions={{
              header: () => null,
            }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
