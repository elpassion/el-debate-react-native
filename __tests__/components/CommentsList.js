import 'react-native';
import React from 'react';
import CommentsList from 'app/components/CommentsList/CommentsList'

it('renders correctly', () => {
  const wrapper = shallow(<CommentsList />)
  expect(wrapper).toMatchSnapshot();
});
