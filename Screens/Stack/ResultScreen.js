import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';

const Height = Dimensions.get('window').height;

const ResultScreen = ({ route }) => {
  const { finalData } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <View style={{ height: Height / 1.3 }}>
        <FlatList
          data={finalData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.origin}
          renderItem={({ item }) => {
            const { origin, destination, busType, timings } = item;
            return (
              <View>
                {timings.length > 0 && (
                  <View>
                    {timings.map((timing, i) => {
                      return (
                        <View
                          key={i}
                          style={{
                            marginVertical: 10,
                            shadowColor: '#fa8231',
                            elevation: 10,
                            borderWidth: 2,
                            borderBottomColor: '#fa8231',
                            borderTopColor: '#fa8231',
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            padding: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#fa8231',
                                fontSize: 25,
                                fontFamily: 'Macondo',
                              }}>
                              Origin:{' '}
                            </Text>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                fontFamily: 'Andika',
                              }}>
                              {origin}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#fa8231',
                                fontSize: 25,

                                fontFamily: 'Macondo',
                              }}>
                              Destinaiton:{' '}
                            </Text>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                fontFamily: 'Andika',
                              }}>
                              {destination}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#fa8231',
                                fontSize: 25,
                                fontFamily: 'Macondo',
                              }}>
                              Bus Type:{' '}
                            </Text>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                fontFamily: 'Andika',
                              }}>
                              {busType}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                color: '#fa8231',
                                fontSize: 25,
                                fontFamily: 'Macondo',
                              }}>
                              Time:{' '}
                            </Text>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                fontFamily: 'Andika',
                              }}>
                              {timing.data}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            );
          }}
        />
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

export default ResultScreen;

const styles = StyleSheet.create({});
