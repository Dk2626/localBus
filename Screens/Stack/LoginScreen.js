import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../../context/Context';
import { database } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const LoginScreen = () => {
  const { user, setUser, isLogin, setIsLogin } = useContext(AuthContext);
  const { name, mobileNumber } = user;
  const [data, setData] = useState(false);
  const [nameReq, setNameReq] = useState(false);
  const [mobileNumberReq, setMobileNumberReq] = useState(false);

  const submit = () => {
    database
      .ref('Users')
      .push({
        name: name,
        mobileNumber: mobileNumber,
      })
      .then(() => {
        save(user);
      })
      .catch((error) => console.log('error', error));
  };

  const save = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('usertoken', jsonValue);
      setIsLogin(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getData = () => {
    database.ref('Users').on('value', (data) => {
      data.forEach((data) => {
        if (mobileNumber == data.val().mobileNumber) {
          setUser(data.val());
          setData(true);
          setNameReq(false);
        }
      });
    });
  };

  useEffect(() => {
    getData();
  }, [mobileNumber]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
      }}>
      <View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 32,
              color: '#fa8231',
              fontFamily: 'Macondo',
            }}>
            Welcome to the LocalBus
          </Text>
          <Text
            style={{
              fontFamily: 'Macondo',
              fontSize: 16,
            }}>
            Search your Origin & Destination
          </Text>
        </View>
      </View>
      <View>
        <View>
          <Text
            style={{
              marginBottom: 20,
              fontFamily: 'Andika',
              fontSize: 16,
            }}>
            Name
          </Text>
          <TextInput
            style={{
              borderRadius: 10,
              padding: 12,
              marginBottom: nameReq ? 10 : 30,
              borderColor: '#fa8231',
              borderWidth: 1,
              fontFamily: 'Andika',
            }}
            value={name}
            onChangeText={(value) => {
              setUser({
                ...user,
                name: value,
              });
              setNameReq(false);
            }}
            onBlur={() => {
              if (name.length <= 0) {
                setNameReq(true);
              }
            }}
          />
          {nameReq && (
            <Text style={{ fontSize: 12, color: 'red', marginBottom: 20 }}>
              Name required!
            </Text>
          )}
        </View>
        <View>
          <Text
            style={{ marginBottom: 20, fontFamily: 'Andika', fontSize: 16 }}>
            Mobile number
          </Text>
          <TextInput
            style={{
              borderRadius: 10,
              padding: 12,
              marginBottom: mobileNumberReq ? 10 : 30,
              borderColor: '#fa8231',
              borderWidth: 1,
              fontFamily: 'Andika',
            }}
            value={mobileNumber}
            keyboardType='numeric'
            maxLength={10}
            onChangeText={(value) => {
              setUser({
                ...user,
                mobileNumber: value,
              });
              setMobileNumberReq(false);
            }}
            onBlur={() => {
              if (mobileNumber.length < 10) {
                setMobileNumberReq(true);
              }
            }}
          />
          {mobileNumberReq && (
            <Text style={{ fontSize: 12, color: 'red', marginBottom: 20 }}>
              Mobile Number required!
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (mobileNumber.length < 10) {
              setMobileNumberReq(true);
            } else {
              data ? save(user) : submit();
            }
          }}
          disabled={!name || !mobileNumber}
          style={{
            alignItems: 'center',
            backgroundColor: '#fa8231',
            padding: 20,
            borderRadius: 20,
          }}>
          <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'Macondo' }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
