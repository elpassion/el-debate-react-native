import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  navContainer: {
    backgroundColor: 'white'
  },
  comments: {
    flex: 1,
    marginBottom: 60,
    top: 0
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
  },
  userDetailsModal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 220,
    aspectRatio: 1.5,
    backgroundColor: "#f2f2f2",
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: (Platform.OS === 'ios') ? 0.08 : 0.3,
  },
  nameInput: {
    height: 30,
    alignSelf: 'center',
    aspectRatio: 8,
    backgroundColor: 'white',
  },
  userDetailsButton: {
    height: (Platform.OS === 'ios') ? 30 : 40,
    aspectRatio: 4,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
    borderColor: 'white',
    backgroundColor: '#4CC359'
  },
  userDetailsButtonText: {
    color: 'white',
    fontSize: 15
  },
  inputBox: {
    height: 35,
    aspectRatio: 8,
    marginBottom: 15,
    borderRadius: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
