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

export default class CommentsList extends Component {
  constructor(props) {
    super(props)

    this.pusher = null

    this.state = {
      data: [],
      isFetched: false,
      commentString: '',
      inputLocation: 0,
      authToken: ''
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
    AsyncStorage.getItem('code')
      .then((value) => this.setupPusher(value))
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

  _onAddCommentPressed = () => {
    Api.createComment(this.state.authToken, this.state.commentString)
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
              autoFocus={true}
              style={styles.commentInput}
              onChange={this._onCommentTextChanged}
              placeholder='Add comment'
              onSubmitEditing={this._onAddCommentPressed}/>
          </View>
          <TouchableOpacity
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
