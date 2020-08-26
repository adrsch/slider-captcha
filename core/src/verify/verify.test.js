import verify from './verify';

// eslint-disable-next-line
const human = {"response":128.84,"trail":{"x":[0,1,8,16,22,25,26,27,31,32,35,43,57,73,85,96,109,128,144,154,158,160,159,159,158,156,154,153,152,151,151,151,149,148,147,147,145,144,143,142,143,145,147,148,146,144,142,141,140,141,141,142,143,146,148,149,150,148,145,143,140,138,135,132,133,137,141,143,144],"y":[0,0,1,3,5,6,6,6,7,8,8,9,10,12,12,13,13,12,10,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,7,7,7,7,7,7,7,7,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,5,3,3,3,4,5,6,6]}}

test('accepts human solution', () => {
  verify(130, human, { tolerance: 2 })
    .then((verification) => expect(verification.result).toBe('success'));
});

test('accepts perfect solution', () => {
  verify(
    130,
    {
      response: 130,
      trail: {
        x: [0, 0, 1000, 130],
        y: [0, 0, 1, 1],
      },
    },
    { tolerance: 1 },
  ).then((verification) => expect(verification.result).toBe('success'));
});

test('rejects solution with missmatched trail lengths', () => {
  verify(
    130,
    {
      response: human.response,
      trail: {
        x: [0, 1000, 129],
        y: [0, 0, 1, 1],
      },
    },
    { tolerance: 2 },
  ).then((verification) => expect(verification.result).toBe('failure'));
});

test('rejects solution without intermediate values in trail', () => {
  verify(
    130,
    {
      response: human.response,
      trail: {
        x: [0, 0, 129, 129],
        y: [0, 0, 1, 1],
      },
    },
    { tolerance: 2 },
  ).then((verification) => expect(verification.result).toBe('failure'));
});

test('rejects solution without vertical motion', () => {
  verify(
    130,
    {
      response: human.response,
      trail: {
        x: [0, 1000, 129],
        y: [0, 0, 0],
      },
    },
    { tolerance: 2 },
  ).then((verification) => expect(verification.result).toBe('failure'));
});
