import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  navContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  main: {
    flex: 1,
    zIndex: 1
  },
  container: {
    flex: 1,
    top: 15,
    position: 'absolute'
  },
  description: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    fontSize: 12,
    fontFamily: 'helvetica-neue-md',
    color: '#B8B8B8',
    backgroundColor: 'transparent'
  },
  topicBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 120,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: (Platform.OS === 'ios') ? 0.08 : 0.3,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  topic: {
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 24,
    fontFamily: 'helvetica-neue-md',
    color: '#4A4A4A'
  },
  answerBox: {
    alignSelf: 'center',
    width: '90%',
    height: 60,
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: (Platform.OS === 'ios') ? 0.08 : 0.3,
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  positiveAnswer: {
    marginLeft: 20,
    marginTop: (Platform.OS === 'ios') ? 15 : 18,
    fontSize: 24,
    fontFamily: 'helvetica-neue-lt',
    color: '#0098E3',
    backgroundColor: 'transparent'
  },
  negativeAnswer: {
    marginLeft: 20,
    marginTop: (Platform.OS === 'ios') ? 15 : 18,
    fontSize: 24,
    fontFamily: 'helvetica-neue-lt',
    color: '#E44043',
    backgroundColor: 'transparent'
  },
  neutralAnswer: {
    marginLeft: 20,
    marginTop: (Platform.OS === 'ios') ? 15 : 18,
    fontSize: 24,
    fontFamily: 'helvetica-neue-lt',
    color: '#8F8F8F',
    backgroundColor: 'transparent'
  },
  footer: {
    bottom: -15
  },
  backgroundImage: {
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 0,
    bottom: -70
  },
  positiveAnswerIcon: {
    marginRight: 20,
    marginTop: (Platform.OS === 'ios') ? 15 : 16
  },
  negativeAnswerIcon: {
    marginRight: 20,
    marginTop: (Platform.OS === 'ios') ? 17 : 20
  },
  neutralAnswerIcon: {
    marginRight: 20,
    marginTop: 15
  },
  button: {
    bottom: 10,
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
  progressBar: {
    width: '90%',
    alignSelf: 'center'
  }
})
