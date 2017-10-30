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
    bottom: 65
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
  loadingView: {
    alignSelf: 'center',
    marginTop: 250
  },
  activityIndicator: {
    marginBottom: 20
  },
  commentInput: {
    bottom: 0,
    marginLeft: 20,
    marginRight: 55,
    height: 40
  },
  newCommentBox: {
    borderTopColor: '#4CC359',
    borderTopWidth: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    width: '100%',
    height: 65,
    justifyContent: 'center'
  },
  commentInputText: {
    fontSize: 10,
    fontFamily: 'helvetica-neue-md',
    color: '#4CC359',
    backgroundColor: 'transparent',
    left: 20
  },
  confirmCommentIcon: {
    fontSize: 42,
    color: '#4CC359'
  },
  confirmationButton: {
    height: 60,
    width: 30,
    right: 15,
    position: 'absolute'
  }
})
