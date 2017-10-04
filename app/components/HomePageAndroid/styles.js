import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'helvetica-neue',
    color: '#656565'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    top: 80,
  },
  backgroundImage: {
    bottom: 0,
    width: '90%',
  },
  pinInput: {
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
    height: 50,
    width: '80%',
    bottom: 80,
    backgroundColor: '#4CC359',
    borderRadius: 0,
    borderColor: '#fff',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    right: 0,
    left: 0,
    alignItems: 'center'
  }
})
