import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import LoginScreen from './Screens/Stack/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './Screens/Tab/MainScreen';
import UserScreen from './Screens/Tab/UserScreen';
import { AuthContext } from './context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminScreen from './Screens/Tab/AdminScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Text, LogBox, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import IconF from '@expo/vector-icons/FontAwesome5';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Andika: require('./assets/fonts/Andika-Regular.ttf'),
    Macondo: require('./assets/fonts/Macondo-Regular.ttf'),
  });
  LogBox.ignoreLogs(['Setting a timer']);
  const [user, setUser] = useState({
    name: '',
    mobileNumber: '',
  });
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const jsonValue = await AsyncStorage.getItem('usertoken');
      if (jsonValue != null) {
        setUser(JSON.parse(jsonValue));
        setIsLogin(true);
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (!loaded) {
    return <AppLoading />;
  }
  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            user,
            setUser,
            isLogin,
            setIsLogin,
          }}>
          <StatusBar style='light' />
          {isLogin == false ? (
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              initialRouteName='MainScreen'
              screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  bottom: 20,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  elevation: 12,
                  shadowColor: '#fa8231',
                },
              }}>
              <Tab.Screen
                name='MainScreen'
                component={MainScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View>
                      <Icon
                        name='home'
                        size={25}
                        color={focused ? '#fa8231' : '#000'}
                      />
                    </View>
                  ),
                }}
              />
              <Tab.Screen
                name='UserScreen'
                component={UserScreen}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <View>
                      <IconF
                        name='user-circle'
                        size={22}
                        color={focused ? '#fa8231' : '#000'}
                      />
                    </View>
                  ),
                }}
              />
              {user.mobileNumber == '7904285405' && (
                <Tab.Screen
                  name='AdminScreen'
                  component={AdminScreen}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <View>
                        <IconF
                          name='user-tie'
                          size={22}
                          color={focused ? '#fa8231' : '#000'}
                        />
                      </View>
                    ),
                  }}
                />
              )}
            </Tab.Navigator>
          )}
        </AuthContext.Provider>
      </NavigationContainer>
    );
  }
}
