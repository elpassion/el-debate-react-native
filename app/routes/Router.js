import { StackNavigator } from 'react-navigation';

import HomePage from '/app/components/HomePage/HomePage';
import DebateDetails from '/app/components/DebateDetails/DebateDetails';
import CommentsList from '/app/components/CommentsList/CommentsList';

const Router = StackNavigator({
  initialRouteName: {
    screen: HomePage,
    navigationOptions: ({navigation}) => ({
      title: 'EL Debate',
      headerStyle: { backgroundColor: '#4CC359', borderBottomColor: 'white', height: 80 },
      headerTitleStyle: { color: 'white', fontSize: 20 }
    }),
    cardStyle: { backgroundColor: 'white' }
  },
  DebateDetails: {
    path: 'debate-details',
    screen: DebateDetails,
  },
  CommentsList: {
    path: 'comments-list',
    screen: CommentsList
  }
});

export default Router;
