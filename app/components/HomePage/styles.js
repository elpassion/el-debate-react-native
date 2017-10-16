import { StyleSheet, Platform } from 'react-native'

export default styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'helvetica-neue',
    color: '#656565'
  },
  navContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    top: (Platform.OS === 'ios') ? 100 : 70,
  },
  main: {
    flex: 1,
    alignItems: 'center',
  },
  logoImage: {
    width: 106,
    height: 50,
    resizeMode: 'contain'
  },
  iosPinInput: {
    bottom: 0,
    height: 40,
    width: '80%',
    textAlign: 'center',
    marginRight: 5,
    marginTop: 40,
    borderBottomColor: '#C0C0C0',
    borderBottomWidth: 1,
    fontSize: 18,
    color: '#8F8F8F',
  },
  androidPinInput: {
    bottom: 0,
    height: 60,
    width: '80%',
    textAlign: 'center',
    marginRight: 5,
    marginTop: 40,
    fontSize: 20,
    color: '#8F8F8F',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center'
  }
})
