'use strict';

import { NavigatorIOS, StyleSheet, Text, View, Platform } from 'react-native';
import React, { Component } from 'react';
import { Font } from 'expo';
import { NativeRouter, Route, Link } from 'react-router-native'
import NavigationBar from 'react-native-navigation-bar';

import HomePageIOS from './HomePageIOS';
import HomePageAndroid from './HomePageAndroid';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
  }
  async componentDidMount() {
    await Font.loadAsync({
      'helvetica-neue': require('./resources/fonts/HelveticaNeueLt.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (Platform.OS === 'ios')
    return (
      this.state.fontLoaded ? (
        <NavigatorIOS
        initialRoute={{
          component: HomePageIOS,
          title: 'EL Debate',
          barTintColor: '#4CC359',
          titleTextColor: '#fff',
          tintColor: '#fff',
        }}
        style={{flex: 1}}
      />
      ) : null
    )
    else
    return (
      this.state.fontLoaded ? (
        <NativeRouter>
          <View style={styles.container}>
          <NavigationBar
            title={'EL Debate'}
            height={55}
            titleColor={'#fff'}
            backgroundColor={'#4CC359'}
            />
            <Route exact path='/' component={HomePageAndroid}/>
          </View>
        </NativeRouter>
      ) : null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 24,
  },
});
