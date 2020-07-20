import getRandomInt from '../getRandomInt';

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    }
    return {
      message: () =>
        `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass: false,
    };
  },
});

describe('getRandomInt function', () => {
  it('given min and max arguments returns value between min and max', () => {
    const min = 1;
    const max = 10;
    expect(getRandomInt(min, max)).toBeWithinRange(min, max);
  });
});
