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
    bottom: 40
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
    width: '100%',
    bottom: 0,
    left: 20,
    right: 20,
    height: 40
  },
  newCommentBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    width: '100%'
  }
})
