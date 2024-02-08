import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Add })).toEqual(2);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Subtract })).toEqual(
      1,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Multiply })).toEqual(
      2,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Divide })).toEqual(2);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 2, b: 1, action: Action.Exponentiate }),
    ).toEqual(2);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: 'cc' })).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 'x', b: 'y', action: 'cc' })).toBeNull;
  });
});
