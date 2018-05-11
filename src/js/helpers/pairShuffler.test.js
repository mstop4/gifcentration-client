import pairShuffler from './pairShuffler'

it('should return a shuffled array of 18 elements from 9 pairs', () => {
  let numPairs = 9;
  let arr = pairShuffler(numPairs);

  expect(arr).toHaveLength(18);
}); 