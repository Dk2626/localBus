import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { database } from '../../firebase';
import Edit from '@expo/vector-icons/MaterialIcons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { AdMobInterstitial, AdMobRewarded, AdMobBanner } from 'expo-ads-admob';

const AdminScreen = () => {
  const [busData, setBusData] = useState({
    origin: '',
    destination: '',
    busType: 'Moffusil Bus',
    timings: '',
  });
  const [time, setTime] = useState({
    id: uuid.v4(),
    data: '',
  });
  const { origin, destination, timings, busType } = busData;
  const { id, data } = time;
  const [edit, setEdit] = useState(false);
  const [key, setKey] = useState('');

  const editTime = (ids) => {
    setEdit(true);
    const timesFilter = timings.filter((time) => time.id == ids);
    const { id, data } = timesFilter[0];
    setTime({
      ...time,
      id: id,
      data: data,
    });
  };

  const updateTime = (ids) => {
    timings.map((times) => {
      if (times.id == ids) {
        times.id = time.id;
        times.data = time.data;
        return times;
      }
      return times;
    });
    setEdit(false);
    setTime({
      id: uuid.v4(),
      data: '',
    });
  };

  const deleteTime = (ids) => {
    const timesFilter = timings.filter((time) => time.id !== ids);
    setBusData({
      ...busData,
      timings: timesFilter,
    });
  };

  const submitData = () => {
    database
      .ref('originDest')
      .push({
        origin: origin,
        destination: destination,
        busType: busType,
        timings: timings,
      })
      .then(() => {
        setBusData({
          origin: '',
          destination: '',
          busType: 'Moffusil Bus',
          timings: '',
        });
        setKey('');
        alert('Data added');
      })
      .catch((error) => console.log(error));
  };

  const updateData = () => {
    database
      .ref(`originDest/${key}`)
      .set({
        origin: origin,
        destination: destination,
        busType: busType,
        timings: timings,
      })
      .then(() => {
        setBusData({
          origin: '',
          destination: '',
          busType: 'Moffusil Bus',
          timings: '',
        });
        setKey('');
        alert('Data updated');
      })
      .catch((error) => console.log(error));
  };

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

  const rewarded = async () => {
    await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
    try {
      await AdMobRewarded.requestAdAsync();
      await AdMobRewarded.showAdAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
      }}>
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
          Admin Screen
        </Text>
      </View>
      <View>
        <View>
          <Text style={{ marginBottom: 20 }}>Origin</Text>
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: 'grey',
              borderRadius: 10,
              padding: 10,
              marginBottom: 20,
            }}
            onChangeText={(value) =>
              setBusData({
                ...busData,
                origin: value,
              })
            }
            value={origin}
          />
        </View>
        <View>
          <Text style={{ marginBottom: 20 }}>Destination</Text>
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: 'grey',
              borderRadius: 10,
              padding: 10,
              marginBottom: 20,
            }}
            onChangeText={(value) =>
              setBusData({
                ...busData,
                destination: value,
              })
            }
            value={destination}
          />
        </View>
        <View>
          <Text style={{ marginBottom: 20 }}>Time</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: 'grey',
                borderRadius: 10,
                padding: 10,
                marginBottom: 20,
                width: '60%',
              }}
              onChangeText={(value) =>
                setTime({
                  ...time,
                  data: value,
                })
              }
              value={data}
            />
            <TouchableOpacity
              style={{
                backgroundColor: edit ? 'green' : '#383CC1',
                borderRadius: 20,
                padding: 10,
                width: '30%',
                alignItems: 'center',
              }}
              disabled={!data}
              onPress={() => {
                if (edit) {
                  updateTime(id);
                } else {
                  setBusData({
                    ...busData,
                    timings: [...timings, time],
                  });
                  setTime({
                    id: uuid.v4(),
                    data: '',
                  });
                }
              }}>
              <Text style={{ color: '#fff' }}>{edit ? '::' : '+'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {timings.length > 0 && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Origin:</Text>
            <Text>{origin}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Destination:</Text>
            <Text>{destination}</Text>
          </View>
          <View>
            <Text style={{ textAlign: 'center' }}>Time</Text>
            <ScrollView
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
              style={{ height: 280 }}>
              {timings.map((d) => {
                const { id, data } = d;
                return (
                  <View
                    key={id}
                    style={{
                      padding: 10,
                      elevation: 3,
                      shadowColor: '#000',
                      margin: 5,
                      borderRadius: 3,
                      width: 100,
                      alignItems: 'center',
                    }}>
                    <Text>{data}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity onPress={() => editTime(id)}>
                        <Edit name='edit' size={20} color='blue' />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteTime(id)}>
                        <Icon name='delete-forever' size={20} color='red' />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: key != '' ? 'green' : '#383CC1',
          borderRadius: 20,
          padding: 10,
          alignItems: 'center',
          marginTop: 20,
        }}
        disabled={!origin || !destination || !timings}
        onPress={() => (key != '' ? updateData() : submitData())}>
        <Text style={{ color: 'white' }}>
          {key != '' ? 'Update' : 'Submit'}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{ margin: 20 }}>
          <Button title='Interstitial ad' onPress={() => interstitial()} />
        </View>
        <View style={{ margin: 20 }}>
          <Button title='Reward ad' onPress={() => rewarded()} />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <AdMobBanner
          bannerSize='smartBannerPortrait'
          adUnitID='ca-app-pub-3940256099942544/6300978111'
        />
      </View>
    </SafeAreaView>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({});
