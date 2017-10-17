import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  AsyncStorage,
  Alert,
  ScrollView
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
        <View style={styles.footer}>
          <Image source={require('/resources/images/backgroundimg.png')} style={styles.backgroundImage} />
        </View>
        <ScrollView style={styles.container}>
          <Text style={styles.description}>
            Our debate is about:
          </Text>
          <View style={styles.topicBox}>
            <Text style={styles.topic}>
              {this.state.topic}
            </Text>
          </View>
          <Text style={styles.description}>
            Choose your side with one of the following:
          </Text>
          <View style={styles.answerBox}>
            <Text style={styles.positiveAnswer}>
              {this.state.positiveAnswer}
            </Text>
            <Image source={require('/resources/images/PositiveIcon.png')} style={styles.positiveAnswerIcon}/>
          </View>
          <View style={styles.answerBox}>
            <Text style={styles.negativeAnswer}>
              {this.state.negativeAnswer}
            </Text>
            <Image source={require('/resources/images/NegativeIcon.png')} style={styles.negativeAnswerIcon}/>
          </View>
          <View style={styles.answerBox}>
            <Text style={styles.neutralAnswer}>
              {this.state.neutralAnswer}
            </Text>
            <Image source={require('/resources/images/NeutralIcon.png')} style={styles.neutralAnswerIcon}/>
          </View>
          <Text style={styles.description}>
            Remember that you can change your mind before debate ends, thats why we are here!
          </Text>
        </ScrollView>
      </View>
    );
  }
}
