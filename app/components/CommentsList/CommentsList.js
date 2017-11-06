import React, { Component } from 'react'
import { PUSHER_KEY, PUSHER_CLUSTER } from 'react-native-dotenv'
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList
} from 'react-native';
import styles from './styles'
import Navbar from '/app/components/Shared/Navbar'
import Svg, { Circle } from 'react-native-svg';
import AlertModal from '/app/components/Shared/AlertModal'
import Api from '/app/api/Api'
import Comment from '/app/components/Comment/Comment'
import Pusher from 'pusher-js/react-native';
import Keyboard from 'Keyboard';
import Modal from 'react-native-modalbox';
import Button from 'apsl-react-native-button'

export default class CommentsList extends Component {
  constructor(props) {
    super(props)

    this.pusher = null

    this.state = {
      data: [],
      isFetched: false,
      commentString: '',
      inputLocation: 0,
      authToken: '',
      firstName: '',
      lastName: '',
      isOpen: false,
      code: ''
    }

    AsyncStorage.getItem('authToken')
      .then((value) => this.getComments(value))
  }

  getComments = (authToken) => {
    this.setState({ authToken: authToken })
    Api.getComments(authToken)
      .then(response => response.json())
      .then(response => this._handleCommentsResponse(response))
      .catch(error =>
        this.refs.alertModal.openModalAlert(error)
      );
  }

  _handleCommentsResponse = (response) => {
    this.setState({ data: response.comments, isFetched: true })
    setTimeout(() => {this.refs.flatList.scrollToEnd()}, 50)
  }

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  componentWillUnmount() {
    Keyboard.removeAllListeners('keyboardWillShow', (message) => console.log(message))
    Keyboard.removeAllListeners('keyboardWillHide', (message) => console.log(message))
  }

  keyboardWillShow(e) {
    this.setState({inputLocation: e.endCoordinates.height})
  }

  keyboardWillHide(e) {
    this.setState({inputLocation: 0})
  }

  componentDidMount() {
    AsyncStorage.multiGet(['code', 'firstName', 'lastName'])
      .then((values) => this._handleAsyncResponse(values))
  }

  _handleAsyncResponse = (values) => {
    obj = {}
    values.forEach((value) => value[1] ? obj[value[0]] = value[1] : null)
    this.setState(obj)
    this.setupPusher(this.state.code)
  }

  setupPusher = (code) => {
    var pusher = new Pusher(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
      encrypted: true
    });

    var commentChannel = pusher.subscribe('dashboard_channel_' + code);
    commentChannel.bind('comment_added', (data) => {
      var newData = this.state.data.slice();
      newData.push(data);
      this.setState({ data: newData })
      setTimeout(() => {this.refs.flatList.scrollToEnd()}, 50)
    });
  }

  _onCommentTextChanged = (event) => {
    this.setState({ commentString: event.nativeEvent.text });
  };

  _onFirstNameTextChanged = (event) => {
    this.setState({ firstName: event.nativeEvent.text });
  };

  _onLastNameTextChanged = (event) => {
    this.setState({ lastName: event.nativeEvent.text });
  };

  _onAddCommentPressed = () => {
    if (this.state.firstName === '' || this.state.lastName === '') {
      this.refs.userDetailsModal.open()
    } else {
      this._createComment()
    }
  }

  _createComment = () => {
    Api.createComment(
      this.state.authToken,
      this.state.commentString,
      this.state.firstName,
      this.state.lastName
    )
      .then(response => response.json())
      .then(response => this._handleResponse(response))
      .catch(error =>
        this.refs.alertModal.openModalAlert(error)
      )
  }

  _handleResponse = (response) => {
    if (response.status === "pending") {
      this.refs.alertModal.openModalAlert('Your comment is being moderated.')
    }
    AsyncStorage.multiSet([['firstName', this.state.firstName], ['lastName', this.state.lastName]])
    this.setState({commentString: ''})
    this.refs.newCommentInput.clear()
  }

  render() {
    const comment = (comment) =>
      <Comment
         content={comment.content}
         createdAt={new Date(comment.created_at)}
         fullName={comment.full_name}
         userInitials={comment.user_initials}
         userInitialsColor={comment.user_initials_background_color}
       />
    return (
      !this.state.isFetched ?
      <View style={styles.loadingView}>
        <ActivityIndicator size='large' style={styles.activityIndicator}/>
        <Text style={styles.description}>
          Comments are being fetched.
        </Text>
      </View> :
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.navContainer}>
          <Navbar history={this.props.history}/>
        </View>
        <Modal
          style={styles.userDetailsModal}
          ref="userDetailsModal"
          isOpen={this.state.isOpen}
          onClosed={() => this.setState({isOpen: false})}>
            <View>
              <Text style={styles.description}> Set your first name and last name to add comments </Text>
              <View style={styles.inputBox}>
                <TextInput
                  ref="firstNameInput"
                  autoFocus={true}
                  style={styles.nameInput}
                  onChange={this._onFirstNameTextChanged}
                  placeholder='First Name'
                  autoCorrect={false}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={() => this.focusNextField('lastNameInput')}/>
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  ref="lastNameInput"
                  style={styles.nameInput}
                  onChange={this._onLastNameTextChanged}
                  placeholder='Last Name'
                  autoCorrect={false}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={this._onNewNamePressed}/>
              </View>
              <Button title="Set name" onPress={() => this.refs.userDetailsModal.close()} style={styles.userDetailsButton}>
                <Text style={styles.userDetailsButtonText}>Set name</Text>
              </Button>
            </View>
        </Modal>
        <FlatList
          ref="flatList"
          style={styles.comments}
          data={this.state.data}
          renderItem={({item}) => comment(item)}
          keyExtractor={item => item.id}
        />
        <AlertModal
          ref="alertModal"
          bottomPosition={60}
          animationDuration={0}
        />
        <View style={[{ bottom: this.state.inputLocation }, styles.newCommentBox]}>
          <View>
            <Text style={styles.commentInputText}>Share your thoughts:</Text>
            <TextInput
              ref="newCommentInput"
              autoFocus={true}
              style={styles.commentInput}
              onChange={this._onCommentTextChanged}
              placeholder='Add comment'
              underlineColorAndroid='transparent'
              onSubmitEditing={this._onAddCommentPressed}/>
          </View>
          <TouchableOpacity
            disabled={this.state.commentString === ''}
            onPress={this._onAddCommentPressed}
            style={styles.confirmationButton}>
            <Text style={styles.confirmCommentIcon}>
              >
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
