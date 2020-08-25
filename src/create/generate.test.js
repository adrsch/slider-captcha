import { randInt } from './generate';

test('randInt generates ints within range', () => {
  expect(randInt(3, 4)).toBe(3)
});
