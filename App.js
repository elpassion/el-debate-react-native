import {  StyleSheet, Text, View, Platform } from 'react-native';
import React, { Component } from 'react';
import { Font } from 'expo';
import { NativeRouter, Route, Link } from 'react-router-native'

import HomePage from './app/components/HomePage/HomePage';
import DebateDetails from './app/components/DebateDetails/DebateDetails';

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
    if (this.state.fontLoaded) {
      return (
        <NativeRouter>
          <View style={styles.container}>
            <Route exact path='/' component={HomePage}/>
            <Route path='/debate-details' component={DebateDetails}/>
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
