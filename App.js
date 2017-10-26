import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import React, { Component } from 'react';
import { Font } from 'expo';
import { NativeRouter, Route, Link } from 'react-router-native'

import HomePage from './app/components/HomePage/HomePage';
import DebateDetails from './app/components/DebateDetails/DebateDetails';
import Comments from './app/components/Comments/Comments';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fontLoaded: false };
    StatusBar.setBarStyle('light-content', true);
  }
  async componentDidMount() {
    await Font.loadAsync({
      'helvetica-neue-lt': require('./resources/fonts/HelveticaNeueLt.ttf'),
      'helvetica-neue-md': require('./resources/fonts/HelveticaNeueMd.ttf')
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
            <Route path='/comments' component={Comments}/>
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
