import { StackNavigator } from 'react-navigation';

import HomePage from '/app/components/HomePage/HomePage';
import DebateDetails from '/app/components/DebateDetails/DebateDetails';
import CommentsList from '/app/components/CommentsList/CommentsList';

import { Platform } from 'react-native'

const Router = StackNavigator({
  initialRouteName: {
    screen: HomePage,
    navigationOptions: ({navigation}) => ({
      title: 'EL Debate',
      headerStyle: { backgroundColor: '#4CC359', borderBottomColor: 'white', height: (Platform.OS === 'ios') ? 80 : 60 },
      headerTitleStyle: { color: 'white', fontSize: 18, alignSelf: 'center' },
      headerBackTitle: null,
      headerBackTitleStyle: { color: 'white' },
      headerTintColor: 'white'
    }),
    cardStyle: { backgroundColor: 'white' }
  },
  DebateDetails: {
    path: 'debate-details',
    screen: DebateDetails,
    navigationOptions: ({navigation}) => ({
      title: 'EL Debate',
      headerStyle: { backgroundColor: '#4CC359', borderBottomColor: 'white', height: (Platform.OS === 'ios') ? 80 : 60 },
      headerTitleStyle: { color: 'white', fontSize: 18 },
      headerBackTitle: null,
      headerBackTitleStyle: { color: 'white' },
      headerTintColor: 'white'
    }),
    cardStyle: { backgroundColor: 'white' }
  },
  CommentsList: {
    path: 'comments-list',
    screen: CommentsList,
    navigationOptions: ({navigation}) => ({
      title: 'EL Debate',
      headerStyle: { backgroundColor: '#4CC359', borderBottomColor: 'white', height: (Platform.OS === 'ios') ? 80 : 60 },
      headerTitleStyle: { color: 'white', fontSize: 18 },
      headerBackTitle: null,
      headerBackTitleStyle: { color: 'white' },
      headerTintColor: 'white'
    }),
    cardStyle: { backgroundColor: 'white' }
  }
});

export default Router;
