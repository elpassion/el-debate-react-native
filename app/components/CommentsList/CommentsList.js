import React, { Component } from 'react'
import { PUSHER_KEY, PUSHER_CLUSTER } from 'react-native-dotenv'
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import styles from './styles'
import Navbar from '/app/components/Shared/Navbar'
import Svg, { Circle } from 'react-native-svg';
import AlertModal from '/app/components/Shared/AlertModal'
import Api from '/app/api/Api'
import Comment from '/app/components/Comment/Comment'
import Pusher from 'pusher-js/react-native';

export default class CommentsList extends Component {
  constructor(props) {
    super(props)

    this.pusher = null

    this.state = {
      data: [],
      isFetched: false
    }

    AsyncStorage.getItem('authToken')
      .then((value) => this.getComments(value))
  }

  getComments = (authToken) => {
    Api.getComments(authToken)
      .then(response => response.json())
      .then(response => this._handleCommentsResponse(response))
      .catch(error =>
        this.refs.alertModal.openModalAlert(error)
      );
  }

  _handleCommentsResponse = (response) => {
    this.setState({ data: response.comments, isFetched: true })
  }

  showComments = () => {
    return (this.state.data.map(function(comment, key){
      return <Comment
          key={key}
          content={comment.content}
          createdAt={new Date(comment.created_at)}
          fullName={comment.full_name}
          userInitials={comment.user_initials}
          userInitialsColor={comment.user_initials_background_color}
        />
    }))
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
    });
  }

  render() {
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
        <ScrollView
          style={styles.comments}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{
            this.scrollView.scrollToEnd({animated: true});
        }}>
          {this.showComments()}
        </ScrollView>
      </View>
    )
  }
}
