import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import styles from './styles'
import Navbar from '/app/components/Shared/Navbar'
import Svg, { Circle } from 'react-native-svg';
import AlertModal from '/app/components/Shared/AlertModal'
import Api from '/app/api/Api'

export default class Comment extends Component {

  getTime = () => {
    return this.props.createdAt.getHours() +
           ':' +
           (this.props.createdAt.getMinutes() < 10 ? '0' : '') +
           this.props.createdAt.getMinutes()
  }

  render() {
    return (
      <View style={{backgroundColor: false ? '#f7f7f7' : 'white'}}>
        <View style={styles.comment}>
          <View>
            <Text style={styles.userInitials}>{this.props.userInitials}</Text>
            <Svg height="100" width="100" style={styles.circle}>
              <Circle cx="35" cy="40" r="23" fill={this.props.userInitialsColor}/>
            </Svg>
          </View>
          <View style={styles.commentBox}>
            <Text style={styles.commentUser}>{this.props.fullName}</Text>
            <Text style={styles.commentText}>{this.props.content}</Text>
          </View>
          <View>
            <Text style={styles.time}>{this.getTime()}</Text>
          </View>
        </View>
        <View style={styles.commentDash}/>
      </View>
    )
  }
}
