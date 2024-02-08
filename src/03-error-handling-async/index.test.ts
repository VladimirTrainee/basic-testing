import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(5)).toEqual(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const myError = 'my error';
    try {
      throwError(myError);
    } catch (error) {
      expect(`${error}`).toEqual(`Error: ${myError}`);
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (error) {
      expect(`${error}`).toEqual(`Error: Oops!`);
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (error) {
      expect(error).toEqual(new MyAwesomeError());
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const promise = rejectCustomError();
    promise.catch((error) => {
      expect(error).toEqual(new MyAwesomeError());
    });
  });
});
