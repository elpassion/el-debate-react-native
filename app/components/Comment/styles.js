import { StyleSheet, Platform } from 'react-native'

export default StyleSheet.create({
  comment: {
    top: 0,
    marginLeft: 0,
    marginRight: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
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
    left: 70,
    top: 20,
    width: '60%',
    position: 'absolute',
    overflow: 'scroll'
  },
  commentUser: {
    fontFamily: 'helvetica-neue-md',
  },
  commentText: {
    marginTop: 5,
    marginBottom: 20
  },
  time: {
    color: '#B8B8B8',
    marginTop: 20,
    right: 0,
    top: 0,
    position: 'absolute'
  },
  commentDash: {
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    height: 1
  }
})
