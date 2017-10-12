import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  AsyncStorage,
  Alert
} from 'react-native';

import NavigationBar from 'react-native-navigation-bar';
import styles from './styles'
import Api from '/app/api/Api'

export default class DebateDetails extends Component {
  constructor(props) {
    super(props)
    AsyncStorage.getItem('authToken')
      .then((value) => this.getDebate(value))

    this.state = {
      topic: '',
      positiveAnswer: '',
      neutralAnswer: '',
      negativeAnswer: ''
    }
  }

  getDebate = (authToken) => {
    Api.getDebate(authToken)
      .then(response => response.json())
      .then(response => this._handleResponse(response))
      .catch(error =>
        Alert.alert('Something went wrong' + error)
      );
  }

  _handleResponse = (response) => {
    this.setState({
      topic: response.topic,
      positiveAnswer: response.answers.positive.value,
      negativeAnswer: response.answers.negative.value,
      neutralAnswer: response.answers.neutral.value
    })
  }

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
        <View style={styles.container}>
          <Text>
            {this.state.topic}
          </Text>
          <Text>
            {this.state.positiveAnswer}
          </Text>
          <Text>
            {this.state.neutralAnswer}
          </Text>
          <Text>
            {this.state.negativeAnswer}
          </Text>
        </View>
      </View>
    );
  }
}
