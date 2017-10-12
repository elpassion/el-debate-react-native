import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';

import NavigationBar from 'react-native-navigation-bar';
import styles from './styles'

export default class DebateDetails extends Component {
  render() {
    return (
      <View style={styles.navContainer}>
        <NavigationBar
          title={'EL Debate'}
          height={50}
          titleColor={'#fff'}
          backgroundColor={'#4CC359'}
          leftButtonTitle={'Back'}
          leftButtonTitleColor={'#fff'}
          onLeftButtonPress={() => this.props.history.goBack()}
        />
      </View>
    );
  }
}
