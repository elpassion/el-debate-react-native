import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  navContainer: {
    flex: 1
  },
  container: {
    alignItems: 'center',
    flex: 1,
    top: (Platform.OS === 'ios') ? 100 : 70,
  }
})
