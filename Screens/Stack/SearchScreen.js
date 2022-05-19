import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';
import { database } from '../../firebase';
import { Picker } from '@react-native-picker/picker';

const SearchScreen = ({ navigation }) => {
  const [busDatas, setBusDatas] = useState('');
  const [origin, setOrigin] = useState('');
  const [finalOrigin, setFinalOrigin] = useState('');
  const [originPicked, setOriginPicked] = useState('');
  const [finalDestinaiton, setFinalDestination] = useState('');
  const [destinaitonPicked, setDestinaitonPicked] = useState('');
  const [finalData, setFinalData] = useState('');

  const getBusData = () => {
    let initialData = [];
    database.ref('originDest').on('value', (data) => {
      data.forEach((data) => {
        initialData.push(data.val());
      });
      setBusDatas(initialData);
    });
  };

  useEffect(() => {
    getBusData();
  }, []);

  const getOriginData = () => {
    let initialData = [];
    if (busDatas.length > 0) {
      busDatas.forEach((busData) => {
        initialData.push(busData.origin);
      });
      setOrigin(initialData);
    }
  };

  useEffect(() => {
    getOriginData();
  }, [busDatas]);

  const getFinalOriginData = () => {
    const initialData = [];
    if (origin.length > 0) {
      origin.forEach((origin) => {
        if (!initialData.includes(origin)) {
          initialData.push(origin);
        }
        setFinalOrigin(initialData);
      });
    }
  };

  useEffect(() => {
    getFinalOriginData();
  }, [origin]);

  const getDestData = () => {
    let initialData = [];
    if (busDatas.length > 0) {
      busDatas.forEach((busData) => {
        if (busData.origin == originPicked) {
          initialData.push(busData.destination);
        }
      });
      setFinalDestination(initialData);
    }
  };
  useEffect(() => {
    getDestData();
  }, [originPicked]);

  const getFinalData = () => {
    let initialData = [];
    if (busDatas.length > 0) {
      busDatas.forEach((busData) => {
        if (
          busData.origin == originPicked &&
          busData.destination == destinaitonPicked
        ) {
          initialData.push(busData);
        }
      });
      setFinalData(initialData);
    }
  };

  useEffect(() => {
    getFinalData();
  }, [destinaitonPicked]);

  /*
    const interstitial = async () => {
      await AdMobInterstitial.setAdUnitID(
        'ca-app-pub-3940256099942544/1033173712'
        );
        try {
          await AdMobInterstitial.requestAdAsync();
          await AdMobInterstitial.showAdAsync();
        } catch (error) {
          console.log(error);
        }
      };
     */

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
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
            Search your Origin & Destination{' '}
          </Text>
        </View>
      </View>
      <View>
        <View>
          <Text
            style={{ marginBottom: 10, fontFamily: 'Andika', fontSize: 16 }}>
            Origin
          </Text>
          <View
            style={{
              borderRadius: 10,
              marginBottom: 30,
              borderColor: '#fa8231',
              borderWidth: 1,
            }}>
            {finalOrigin.length > 0 && (
              <Picker
                selectedValue={originPicked}
                onValueChange={(itemValue, itemIndex) =>
                  setOriginPicked(itemValue)
                }
                itemTextStyle={{
                  fontFamily: 'Andika',
                }}>
                <Picker.Item label='Select Origin' />
                {finalOrigin.map((origin, i) => {
                  return <Picker.Item label={origin} value={origin} key={i} />;
                })}
              </Picker>
            )}
          </View>
        </View>
        <View>
          <Text
            style={{ marginBottom: 10, fontFamily: 'Andika', fontSize: 16 }}>
            Destinaiton
          </Text>
          <View
            style={{
              borderRadius: 10,
              marginBottom: 30,
              borderColor: '#fa8231',
              borderWidth: 1,
            }}>
            {finalDestinaiton.length > 0 ? (
              <Picker
                selectedValue={destinaitonPicked}
                onValueChange={(itemValue, itemIndex) =>
                  setDestinaitonPicked(itemValue)
                }>
                <Picker.Item label='Select Destinaiton' />
                {finalDestinaiton.map((destination, i) => {
                  return (
                    <Picker.Item
                      key={i}
                      label={destination}
                      value={destination}
                    />
                  );
                })}
              </Picker>
            ) : (
              <View style={{ paddingVertical: 18, paddingLeft: 8 }}>
                <Text style={{ fontSize: 16 }}>Select Destination</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            backgroundColor: '#fa8231',
            padding: 20,
            borderRadius: 20,
          }}
          disabled={!originPicked || !destinaitonPicked}
          onPress={() => {
            navigation.navigate('ResultScreen', { finalData });
            setOriginPicked('');
            setDestinaitonPicked('');
          }}>
          <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'Macondo' }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: 'center' }}>
        <AdMobBanner
          bannerSize='smartBannerPortrait'
          adUnitID='ca-app-pub-3940256099942544/6300978111'
          style={{ marginBottom: 10 }}
        />
        <AdMobBanner
          bannerSize='smartBannerPortrait'
          adUnitID='ca-app-pub-3940256099942544/6300978111'
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
