import {  StyleSheet, Text, View, Platform } from 'react-native';
import React, { Component } from 'react';
import { Font } from 'expo';
import { NativeRouter, Route, Link } from 'react-router-native'
import NavigationBar from 'react-native-navigation-bar';

import HomePageIOS from './HomePageIOS';
import HomePageAndroid from './HomePageAndroid';
import DebateDetailsIOS from './DebateDetailsIOS';

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
    if (this.state.fontLoaded && (Platform.OS === 'ios')) {
      return (
        <NativeRouter>
          <View style={styles.container}>
            <NavigationBar
              title={'EL Debate'}
              height={50}
              titleColor={'#fff'}
              backgroundColor={'#4CC359'}
            />
            <Route exact path='/' component={HomePageIOS}/>
            <Route path='/debate-details-ios' component={DebateDetailsIOS}/>
          </View>
        </NativeRouter>
      );
    } else if (this.state.fontLoaded && (Platform.OS === 'android')) {
      return (
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
      );
    } else {
      return (null);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
