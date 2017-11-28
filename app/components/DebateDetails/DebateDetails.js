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
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Button from 'apsl-react-native-button'
import styles from './styles'
import Api from '/app/api/Api'
import AlertModal from '/app/components/Shared/AlertModal'
import * as Progress from 'react-native-progress';

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
      isFetched: false,
      clearId: 0,
      positiveAnimationOn: false,
      negativeAnimationOn: false,
      neutralAnimationOn: false
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
      lastAnswerId: response.last_answer_id,
      isFetched: true
    })
  }

  _onPressAnswer = (answerId) => {
    this.setState({ isLoading: true })
    this.setAnimation(answerId, true)
    setTimeout(() => {Api.vote(this.state.authToken, answerId)
      .then(response => this._handleVote(response, answerId))
      .catch(error =>
        this.refs.alertModal.openModalAlert(error)
      );}, 800)
  }

  setAnimation = (answerId, bool) => {
    if (this.state.positiveAnswerId === answerId) {
      this.setState({positiveAnimationOn: bool})
    } else if (this.state.negativeAnswerId === answerId) {
      this.setState({negativeAnimationOn: bool})
    } else if (this.state.neutralAnswerId === answerId) {
      this.setState({neutralAnimationOn: bool})
    }
  }

  _handleVote = (response, answerId) => {
    if (response.status === 201) {
      this.setState({ lastAnswerId: answerId })
      this.refs.alertModal.openModalAlert('Vote has been saved')
    } else if (response.status === 403) {
      this.refs.alertModal.openModalAlert('Debate is closed.')
    }
    var clearId = setTimeout(() => { this.setState({ isLoading: false }) }, 800);
    this.setAnimation(answerId, false)
    this.setState({ clearId: clearId })
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.navigation.goBack()
      return true
    }.bind(this))
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
    clearTimeout(this.state.clearId)
  }

  progressBar(isLastAnswer, animationOn, color) {
    return (
      <Progress.Bar
        progress={isLastAnswer && !this.state.isLoading ? 1 : 0}
        color={color}
        height={1}
        width={null}
        indeterminate={animationOn} borderWidth={0}
      />
    )
  }

  render() {
    const isLastAnswerPositive = this.state.lastAnswerId === this.state.positiveAnswerId
    const isLastAnswerNegative = this.state.lastAnswerId === this.state.negativeAnswerId
    const isLastAnswerNeutral  = this.state.lastAnswerId === this.state.neutralAnswerId
    const PositiveIcon =
      isLastAnswerPositive ?
        require('/resources/images/PositiveIcon.png') :
        require('/resources/images/PositiveIconGrey.png')
    const NegativeIcon =
      isLastAnswerNegative ?
        require('/resources/images/NegativeIcon.png') :
        require('/resources/images/NegativeIconGrey.png')
    const NeutralIcon =
      isLastAnswerNeutral ?
        require('/resources/images/NeutralIcon.png') :
        require('/resources/images/NeutralIconGrey.png')

    return (
      <View style={styles.navContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.main}>
            <Text style={styles.description}>
              Our debate is about:
            </Text>
            <View style={styles.topicBox}>
              <Text style={styles.topic}>
                {this.state.topic}
              </Text>
            </View>
            <Text style={[styles.description, { marginBottom: 0 }]}>
              Choose your side with one of the following:
            </Text>
            <TouchableOpacity
              disabled={isLastAnswerPositive || this.state.isLoading || !this.state.isFetched }
              style={styles.answerBox}
              onPress={(e) => {
                  this._onPressAnswer(this.state.positiveAnswerId);
              }}>
              <Text style={styles.positiveAnswer}>
                {this.state.positiveAnswer}
              </Text>
              <Image
                source={PositiveIcon}
                style={styles.positiveAnswerIcon}/>
            </TouchableOpacity>
            <View style={styles.progressBar}>
              { this.progressBar(isLastAnswerPositive, this.state.positiveAnimationOn, '#0098E3') }
            </View>
            <TouchableOpacity
              disabled={isLastAnswerNegative || this.state.isLoading || !this.state.isFetched }
              style={styles.answerBox}
              onPress={(e) => {
                  this._onPressAnswer(this.state.negativeAnswerId);
              }}>
              <Text style={styles.negativeAnswer}>
                {this.state.negativeAnswer}
              </Text>
              <Image
                source={NegativeIcon}
                style={styles.negativeAnswerIcon}/>
            </TouchableOpacity>
            <View style={styles.progressBar}>
              { this.progressBar(isLastAnswerNegative, this.state.negativeAnimationOn, '#E44043') }
            </View>
            <TouchableOpacity
              disabled={isLastAnswerNeutral || this.state.isLoading || !this.state.isFetched }
              style={styles.answerBox}
              onPress={(e) => {
                  this._onPressAnswer(this.state.neutralAnswerId);
              }}>
              <Text style={styles.neutralAnswer}>
                {this.state.neutralAnswer}
              </Text>
              <Image
                source={NeutralIcon}
                style={styles.neutralAnswerIcon}/>
            </TouchableOpacity>
            <View style={styles.progressBar}>
              { this.progressBar(isLastAnswerNeutral, this.state.neutralAnimationOn, '#8F8F8F') }
            </View>
            <Text style={[styles.description, { marginTop: 20 }]}>
              Remember that you can change your mind before debate ends, thats why we are here!
            </Text>
          </ScrollView>
          <View style={styles.footer}>
            <Image source={require('/resources/images/backgroundimg.png')} style={styles.backgroundImage} />
            <Button isDisabled={!this.state.isFetched} onPress={() => this.props.navigation.navigate('CommentsList')} style={styles.button} title="Chat">
              <Text style={styles.buttonText}>
                Chat
              </Text>
            </Button>
          </View>
        </View>
        <AlertModal
          ref="alertModal"
        />
      </View>
    );
  }
}
