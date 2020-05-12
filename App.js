/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {authorize} from 'react-native-app-auth';

class App extends Component {
  state = {
    isLoading: false,
  };

  async processLogin() {
    this.setState({isLoading: true});

    // base config
    const config = {
      issuer: 'https://developer.egov.mv/efaas',
      clientId: 'e083d97e-6b96-40bb-be6e-eb1692c2e836',
      clientSecret: '9a2eb7ed-9cff-4872-be30-f951e486f4e3',
      redirectUrl: 'com.testapp://oauth',
      scopes: ['openid', 'profile'],
    };

    try {
      const result = await authorize(config);
      // result includes accessToken, accessTokenExpirationDate and refreshToken
      this.setState({accessToken: result.accessToken, isLoading: false});
    } catch (error) {
      this.setState({isLoading: false});
    }
  }

  renderTokenView() {
    if (this.state.accessToken !== undefined) {
      return (
        <View
          style={{
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{justifyContent: 'center'}}>
            <Image
              style={{
                width: 40,
                height: 40,
                marginLeft: 16,
                marginRight: 16,
                marginBottom: 16,
                marginTop: 16,
              }}
              source={require('./assets/efaaslogo.png')}
            />
          </View>
          <Text style={{fontWeight: 'bold'}}>accessToken</Text>
          <Text style={{paddingTop: 16}}>{this.state.accessToken}</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              margin: 16,
              padding: 12,
              backgroundColor: '#ff0100',
              alignItems: 'center',
              borderRadius: 6,
            }}
            onPress={() => this.processLogin()}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: 16,
                  marginRight: 16,
                }}
                source={require('./assets/efaaslogo.png')}
              />
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  width: 200,
                  fontWeight: 'bold',
                  color: '#ffffff',
                }}>
                Login with eFaas
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
        <View
          style={{
            flex: 1,
          }}>
          {this.state.isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="#ff0100" />
            </View>
          ) : (
            this.renderTokenView()
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
