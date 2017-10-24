import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import NavigationBar from 'react-native-navigation-bar';
import styles from './styles'
import Api from '/app/api/Api'
import AlertModal from '/app/components/AlertModal'

export default class DebateDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authToken: '',
      topic: '',
      positiveAnswer: '',
      neutralAnswer: '',
      negativeAnswer: '',
      positiveAnswerId: 0,
      negativeAnswerId: 0,
      neutralAnswerId: 0,
      lastAnswerId: 0,
      isLoading: false,
    }

    AsyncStorage.getItem('authToken')
      .then((value) => this.getDebate(value))
  }

  getDebate = (authToken) => {
    this.setState({ authToken: authToken })
    Api.getDebate(authToken)
      .then(response => response.json())
      .then(response => this._handleDebateResponse(response))
      .catch(error =>
        this.refs.alertModal.openModalAlert(error)
      );
  }

  _handleDebateResponse = (response) => {
    this.setState({
      topic: response.topic,
      positiveAnswer: response.answers.positive.value,
      negativeAnswer: response.answers.negative.value,
      neutralAnswer: response.answers.neutral.value,
      positiveAnswerId: response.answers.positive.id,
      negativeAnswerId: response.answers.negative.id,
      neutralAnswerId: response.answers.neutral.id,
      lastAnswerId: response.last_answer_id
    })
  }

  _onPressAnswer = (answerId) => {
    this.setState({ isLoading: true })
    Api.vote(this.state.authToken, answerId)
      .then(response => this._handleVote(response, answerId))
      .catch(error =>
        this.refs.alertModal.openModalAlert(error)
      );
  }

  _handleVote = (response, answerId) => {
    if (response.status === 201) {
      this.setState({ lastAnswerId: answerId })
      this.refs.alertModal.openModalAlert('Vote has been saved')
    } else if (response.status === 403) {
      this.refs.alertModal.openModalAlert('Debate is closed.')
    }
    this.setState({ isLoading: false })
  }

  render() {
    const PositiveIcon =
      this.state.lastAnswerId === this.state.positiveAnswerId ?
        require('/resources/images/PositiveIcon.png') :
        require('/resources/images/PositiveIconGrey.png')
    const NegativeIcon =
      this.state.lastAnswerId === this.state.negativeAnswerId ?
        require('/resources/images/NegativeIcon.png') :
        require('/resources/images/NegativeIconGrey.png')
    const NeutralIcon =
      this.state.lastAnswerId === this.state.neutralAnswerId ?
        require('/resources/images/NeutralIcon.png') :
        require('/resources/images/NeutralIconGrey.png')

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
          <TouchableOpacity
            style={styles.answerBox}
            onPress={() => this._onPressAnswer(this.state.positiveAnswerId)}>
            <Text style={styles.positiveAnswer}>
              {this.state.positiveAnswer}
            </Text>
            <Image
              source={PositiveIcon}
              style={styles.positiveAnswerIcon}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.answerBox}
            onPress={() => this._onPressAnswer(this.state.negativeAnswerId)}>
            <Text style={styles.negativeAnswer}>
              {this.state.negativeAnswer}
            </Text>
            <Image
              source={NegativeIcon}
              style={styles.negativeAnswerIcon}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.answerBox}
            onPress={() => this._onPressAnswer(this.state.neutralAnswerId)}>
            <Text style={styles.neutralAnswer}>
              {this.state.neutralAnswer}
            </Text>
            <Image
              source={NeutralIcon}
              style={styles.neutralAnswerIcon}/>
          </TouchableOpacity>
          <Text style={styles.description}>
            Remember that you can change your mind before debate ends, thats why we are here!
          </Text>
        </ScrollView>
        <AlertModal
          ref="alertModal"
        />
      </View>
    );
  }
}
