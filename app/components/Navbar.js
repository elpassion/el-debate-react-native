import React, { Component } from 'React'
import { Platform } from 'react-native'
import NavigationBar from 'react-native-navigation-bar';

export default class Navbar extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      (Platform.OS === 'ios') ?
        <NavigationBar
          title={'EL Debate'}
          height={50}
          titleColor={'#fff'}
          backgroundColor={'#4CC359'}
          leftButtonTitle={'Back'}
          leftButtonTitleColor={'#fff'}
          onLeftButtonPress={() => this.props.history.goBack()}
        />
      :
        <NavigationBar
          title={'EL Debate'}
          height={50}
          titleColor={'#fff'}
          backgroundColor={'#4CC359'}
        />
    )
  }
}
