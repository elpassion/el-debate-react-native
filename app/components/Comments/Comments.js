import React, { Component } from 'react'
import { View } from 'react-native';

import styles from './styles'
import Navbar from '/app/components/Shared/Navbar'

export default class Comments extends Component {
  render() {
    return (
      <View style={styles.navContainer}>
        <Navbar history={this.props.history}/>
      </View>
    )
  }
}
