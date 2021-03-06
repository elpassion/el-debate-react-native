import { StyleSheet, Platform } from 'react-native'

export default styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'helvetica-neue-lt',
    color: '#656565'
  },
  navContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios') ? 75 : 0,
    top: (Platform.OS === 'ios') ? 0 : 60,
    zIndex: 2
  },
  logoImage: {
    width: 106,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  iosPinInput: {
    bottom: 0,
    height: 40,
    width: '80%',
    textAlign: 'center',
    alignSelf: 'center',
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
    alignSelf: 'center',
    marginRight: 5,
    marginTop: 40,
    fontSize: 20,
    color: '#8F8F8F',
  },
  button: {
    zIndex: 1,
    bottom: 20,
    alignSelf: 'center',
    height: (Platform.OS === 'ios') ? 40 : 50,
    width: '80%',
    backgroundColor: '#4CC359',
    borderRadius: 0,
    borderColor: '#fff'
  },
  buttonText: {
    fontFamily: 'helvetica-neue-lt',
    fontSize: 14,
    color: '#fff'
  },
  keyIcon: {
    position: 'relative',
    left: (Platform.OS === 'ios') ? 45 : 55,
    bottom: (Platform.OS === 'ios') ? 30 : 40
  },
  backgroundImage: {
    alignSelf: 'center',
    zIndex: 1
  }
})
