import 'react-native';
import React from 'react';
import HomePage from 'app/components/HomePage/HomePage';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <HomePage />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
