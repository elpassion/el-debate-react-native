import 'react-native';
import React from 'react';
import Comments from 'app/components/Comments/Comments'

it('renders correctly', () => {
  const wrapper = shallow(<Comments />)
  expect(wrapper).toMatchSnapshot();
});
