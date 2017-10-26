import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  navContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 2
  },
  comments: {
    top: (Platform.OS === 'ios') ? 70 : 0,
    left: 0,
    right: 0,
    zIndex: 0,
    height: '100%'
  },
  comment: {
    top: 0,
    height: 80,
    marginLeft: 0,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  userInitials: {
    position: 'absolute',
    marginTop: 33,
    marginLeft: 25,
    fontFamily: 'helvetica-neue-md',
    fontSize: 12,
    zIndex: 2,
    backgroundColor: 'transparent',
    color: 'white'
  },
  circle: {
    zIndex: 1
  },
  commentBox: {
    marginRight: 80,
    marginTop: 5
  },
  commentUser: {
    position: 'relative',
    marginTop: 15,
    left: -30,
    fontFamily: 'helvetica-neue-md'
  },
  commentText: {
    position: 'relative',
    marginTop: 5,
    left: -30,
    marginRight: 30
  },
  timeBox: {
    marginTop: 20,
    right: 0,
    top: 0,
    position: 'absolute'
  },
  time: {
    color: '#B8B8B8'
  },
  commentDash: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    height: 1
  }
})
