import 'react-native';
import React from 'react';
import HomePage from 'app/components/HomePage/HomePage';

it('renders correctly', () => {
  const tree = shallow(<HomePage />)
  expect(tree).toMatchSnapshot();
});
