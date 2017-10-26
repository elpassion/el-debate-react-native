import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage, StyleSheet } from 'react-native';
import styles from './styles'
import Navbar from '/app/components/Shared/Navbar'
import Svg, { Circle } from 'react-native-svg';
import AlertModal from '/app/components/Shared/AlertModal'
import Api from '/app/api/Api'
import Comment from '/app/components/Comment/Comment'

export default class CommentsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
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
    this.setState({ data: response.comments })
  }

  showComments = () => {
    console.log(typeof(this.state.data))
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

  render() {
    return (
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
