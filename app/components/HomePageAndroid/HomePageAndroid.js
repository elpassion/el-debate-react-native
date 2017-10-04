import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import styles from './styles'
import Button from 'apsl-react-native-button'

export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Welcome to
        </Text>
        <Image source={require('/resources/images/logo.png')}/>
        <View style={styles.footer}>
          <Image source={require('/resources/images/backgroundimg.png')} style={styles.backgroundImage} />
          <Button
            onPress={() => {}}
            style={styles.pinButton}
            textStyle={{color: '#fff', fontFamily: 'helvetica-neue', fontSize: 14}}
          >
          Log in
          </Button>
        </View>
        <TextInput
          keyboardType = 'numeric'
          maxLength = {5}
          style={styles.pinInput}
          placeholder='EL Debate PIN'/>
      </View>
    );
  }
}
