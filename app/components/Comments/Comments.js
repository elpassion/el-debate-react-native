import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native';

import styles from './styles'
import Navbar from '/app/components/Shared/Navbar'
import Svg, { Circle } from 'react-native-svg';

export default class Comments extends Component {
  render() {
    const singleComment = (color, isCurrentUserComment, comment, commentTime, userName, userInitials) =>
      <View style={{backgroundColor: isCurrentUserComment ? '#f7f7f7' : 'transparent'}}>
        <View style={styles.comment}>
          <Text style={styles.userInitials}>{userInitials}</Text>
          <Svg height="100" width="100" style={styles.circle}>
            <Circle cx="35" cy="40" r="23" fill={color}/>
          </Svg>
          <View style={styles.commentBox}>
            <Text style={styles.commentUser}>{userName}</Text>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.time}>{commentTime}</Text>
          </View>
        </View>
        <View style={styles.commentDash}/>
      </View>
    return (
      <View>
        <View style={styles.navContainer}>
          <Navbar history={this.props.history}/>
        </View>
        <ScrollView style={styles.comments}>
        </ScrollView>
      </View>
    )
  }
}
