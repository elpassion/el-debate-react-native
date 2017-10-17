import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  navContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    top: (Platform.OS === 'ios') ? 85 : 55,
  },
  description: {
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 12,
    fontFamily: 'helvetica-neue',
    color: '#B8B8B8',
    backgroundColor: 'transparent'
  },
  topicBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 100,
    borderColor: 'gray',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 0.3,
    marginBottom: 20
  },
  topic: {
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: 'helvetica-neue',
    color: '#4A4A4A'
  },
  answerBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 60,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 0.3,
    marginBottom: 20
  },
  positiveAnswer: {
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'helvetica-neue',
    color: '#0098E3'
  },
  negativeAnswer: {
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'helvetica-neue',
    color: '#E44043'
  },
  neutralAnswer: {
    marginLeft: 20,
    fontSize: 24,
    fontFamily: 'helvetica-neue',
    color: '#8F8F8F'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  backgroundImage: {
    alignSelf: 'center',
    bottom: -30
  }
})
