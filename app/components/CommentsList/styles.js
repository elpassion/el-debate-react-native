import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  navContainer: {
    top: 0,
    right: 0,
    left: 0,
    zIndex: 2,
    height: (Platform.OS == 'ios') ? 70 : 50
  },
  comments: {
    left: 0,
    right: 0,
    bottom: 0
  }
})
