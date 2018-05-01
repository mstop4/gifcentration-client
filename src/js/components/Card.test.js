import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

it('renders without crashing', () => {
  shallow(<Card />);
});

it('has a p', () => {
  const card = shallow(<Card />);
  expect(card.find('p')).toHaveLength(1);
});