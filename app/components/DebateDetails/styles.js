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
    fontFamily: 'helvetica-neue-lt',
    color: '#B8B8B8',
    backgroundColor: 'transparent'
  },
  topicBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    height: 100,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 0.08,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  topic: {
    alignSelf: 'center',
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
    borderWidth: 0.08,
    marginBottom: 20,
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
    marginTop: 15,
    fontSize: 24,
    fontFamily: 'helvetica-neue-lt',
    color: '#0098E3',
    backgroundColor: 'transparent'
  },
  negativeAnswer: {
    marginLeft: 20,
    marginTop: 15,
    fontSize: 24,
    fontFamily: 'helvetica-neue-lt',
    color: '#E44043',
    backgroundColor: 'transparent'
  },
  neutralAnswer: {
    marginLeft: 20,
    marginTop: 15,
    fontSize: 24,
    fontFamily: 'helvetica-neue-lt',
    color: '#8F8F8F',
    backgroundColor: 'transparent'
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
  },
  positiveAnswerIcon: {
    marginRight: 20,
    marginTop: 16
  },
  negativeAnswerIcon: {
    marginRight: 20,
    marginTop: 20
  },
  neutralAnswerIcon: {
    marginRight: 20,
    marginTop: 15
  }
})
