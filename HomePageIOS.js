'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import Button from 'apsl-react-native-button'

export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Welcome to
        </Text>
        <Image source={require('./resources/images/logo.png')}/>
        <TextInput
          keyboardType = 'numeric'
          maxLength = {5}
          style={styles.pinInput}
          placeholder='EL Debate PIN'/>

        <View style={styles.footer}>

          <Image source={require('./resources/images/backgroundimg.png')} style={styles.backgroundImage} />
          <Button
            onPress={() => {}}
            style={styles.pinButton}
            textStyle={{color: '#fff', fontFamily: 'helvetica-neue', fontSize: 14}}
          >
          Log in
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'helvetica-neue',
    color: '#656565'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    top: 100,
  },
  backgroundImage: {
    bottom: 50,
    width: '80%',
  },
  pinInput: {
    bottom: 0,
    height: 40,
    width: '80%',
    textAlign: 'center',
    marginRight: 5,
    marginTop: 40,
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    fontSize: 18,
    color: '#8F8F8F',
  },
  pinButton: {
    alignSelf: 'center',
    height: 40,
    width: '80%',
    bottom: 120,
    backgroundColor: '#4CC359',
    borderRadius: 0,
    borderColor: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center'
  }
})
