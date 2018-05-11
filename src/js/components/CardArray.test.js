import React from 'react';
import { shallow } from 'enzyme';
import CardArray from './CardArray';

it('should have an array of image URLs', () => {
  let cardArray = shallow(<CardArray/>);
  expect(cardArray.state.imageUrls).toHaveLength(1);
})