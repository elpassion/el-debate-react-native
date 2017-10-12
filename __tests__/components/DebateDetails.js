import 'react-native';
import React from 'react';
import HomePage from 'app/components/HomePage/HomePage';
import DebateDetails from 'app/components/DebateDetails/DebateDetails'

it('renders correctly', () => {
  const wrapper = shallow(<DebateDetails />)
  expect(wrapper).toMatchSnapshot();
});

it('renders debate details component if isFetched is true on HomePage', () => {
  const wrapper = shallow(<HomePage isFetched={false}/>)
  expect(wrapper).toMatchSnapshot();
  wrapper.setProps({ isFetched: true })
  expect(wrapper).toMatchSnapshot('DebateDetails');
});
