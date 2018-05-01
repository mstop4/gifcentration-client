import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

it('renders without crashing', () => {
  shallow(<Card />);
});

it('has four divs', () => {
  const card = shallow(<Card />);
  expect(card.find('div')).toHaveLength(4);
});