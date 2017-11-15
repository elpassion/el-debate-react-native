import { StackNavigator } from 'react-navigation';

import HomePage from '/app/components/HomePage/HomePage';
import DebateDetails from '/app/components/DebateDetails/DebateDetails';
import CommentsList from '/app/components/CommentsList/CommentsList';

const Router = StackNavigator({
  initialRouteName: {
    screen: HomePage
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
