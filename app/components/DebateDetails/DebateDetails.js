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
  ActivityIndicator,
} from 'react-native';
import Button from 'apsl-react-native-button'
import styles from './styles'
import Api from '/app/api/Api'
import AlertModal from '/app/components/Shared/AlertModal'

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
      answerPressed: false,
      clearId: 0
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
    this.setState({ isLoading: true, answerPressed: true })
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
    var clearId = setTimeout(() => { this.setState({ answerPressed: false }) }, 500);
    this.setState({ isLoading: false, clearId: clearId })
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function() {
      this.props.history.goBack()
      return true
    }.bind(this))
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
    clearTimeout(this.state.clearId)
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
      !this.state.isFetched ?
      <View style={styles.loadingView}>
        <ActivityIndicator size='large' style={styles.activityIndicator}/>
        <Text style={styles.description}>
          Debate is being fetched.
        </Text>
      </View> :
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
            <Text style={styles.description}>
              Choose your side with one of the following:
            </Text>
            <TouchableOpacity
              disabled={this.state.answerPressed}
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
              disabled={this.state.answerPressed}
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
              disabled={this.state.answerPressed}
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
          <View style={styles.footer}>
            <Image source={require('/resources/images/backgroundimg.png')} style={styles.backgroundImage} />
            <Button isDisabled={!this.state.isFetched} onPress={() => this.props.history.push('/comments-list')} style={styles.button} title="Chat">
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
