import 'react-native';
import React from 'react';

import HomePage from 'app/components/HomePage/HomePage';

import { shallow, mount, render } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


it('renders correctly', () => {
  const tree = shallow(<HomePage />)
  expect(tree).toMatchSnapshot();
});
