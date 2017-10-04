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
    alignItems: 'center',
    flex: 1,
    top: (Platform.OS === 'ios') ? 100 : 70,
  },
  backgroundImage: {
    position: 'absolute',
    bottom: (Platform.OS === 'ios') ? 50 : 0,
    width: '85%',
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
  pinButton: {
    alignSelf: 'center',
    height: (Platform.OS === 'ios') ? 40 : 50,
    width: '80%',
    bottom: (Platform.OS === 'ios') ? 120 : 80,
    backgroundColor: '#4CC359',
    borderRadius: 0,
    borderColor: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: (Platform.OS === 'ios') ? 0 : 50,
    right: 0,
    left: 0,
    alignItems: 'center'
  }
})
