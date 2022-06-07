import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../../context/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';
import IconUser from '@expo/vector-icons/FontAwesome5';
import IconMobile from '@expo/vector-icons/FontAwesome';
import IconMail from '@expo/vector-icons/Ionicons';
import IconLogout from '@expo/vector-icons/MaterialIcons';

const UserScreen = () => {
  const { user, setUser, setIsLogin } = useContext(AuthContext);
  const { name, mobileNumber } = user;

  const remove = async () => {
    try {
      const jsonValue = await AsyncStorage.removeItem('usertoken');
      if (jsonValue == null) {
        setUser({
          name: '',
          mobileNumber: '',
        });
        setIsLogin(false);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        style={{ alignSelf: 'flex-end' }}
        onPress={() => remove()}>
        <IconLogout name='logout' size={27} color='#fa8231' />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 100,
          width: Dimensions.get('window').width * 0.4,
          height: Dimensions.get('window').width * 0.4,
          backgroundColor: '#fa8231',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: 16, fontFamily: 'Andika' }}>Welcome !</Text>
        <Text style={{ fontSize: 60, fontFamily: 'Macondo' }}>
          {name.slice(0, 1).toUpperCase()}
        </Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginVertical: 15 }}>
        <Text style={{ fontSize: 20, fontFamily: 'Andika' }}>User</Text>
        <IconUser
          name='user-alt'
          size={20}
          color='#fa8231'
          style={{ marginVertical: 5 }}
        />
        <Text style={{ fontSize: 16, fontFamily: 'Andika' }}>{name}</Text>
      </View>
      <View style={{ alignItems: 'center', marginVertical: 15 }}>
        <Text style={{ fontSize: 20, fontFamily: 'Andika' }}>Mobile</Text>
        <IconMobile
          name='mobile-phone'
          size={27}
          color='#fa8231'
          style={{ marginVertical: 5 }}
        />
        <Text style={{ fontSize: 16, fontFamily: 'Andika' }}>
          {mobileNumber}
        </Text>
      </View>
      <View style={{ alignItems: 'center', marginVertical: 15 }}>
        <Text style={{ fontSize: 20, fontFamily: 'Andika' }}>Contact us</Text>
        <IconMail
          name='mail'
          size={25}
          color='#fa8231'
          style={{ marginVertical: 5 }}
        />
        <Text style={{ fontSize: 16, fontFamily: 'Andika' }}>
          inevitablecoders@gmail.com
        </Text>
      </View>

      <View style={{ position: 'absolute', bottom: 80 }}>
        <AdMobBanner
          bannerSize='smartBannerPortrait'
          adUnitID='ca-app-pub-3940256099942544/6300978111'
        />
      </View>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({});
