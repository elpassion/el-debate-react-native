import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
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
    marginLeft: 27,
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
