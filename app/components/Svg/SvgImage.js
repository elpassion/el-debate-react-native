import React, { Component } from 'React'
import {
  StyleSheet,
  WebView
} from 'react-native'

export default class SvgImage extends Component {
  render () {
    return (

      <WebView
        source={{uri: this.props.source}}
        style={{width: this.props.width, height: this.props.height, alignSelf: 'center'}}
        scalesPageToFit={true}
      />
    )
  }
}
