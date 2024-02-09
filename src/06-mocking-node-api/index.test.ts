import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as all from '.';
import path from 'node:path';
import fs from 'node:fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenNthCalledWith(1, callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    jest.advanceTimersByTime(timeout - 1);
    expect(callback).not.toHaveBeenCalledWith();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledWith();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 100;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 100;
    const iterations = 50;
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    for (let interval = 1; interval <= iterations; interval++) {
      jest.advanceTimersByTime(timeout - 1);
      expect(callback).toHaveBeenCalledTimes(interval - 1);
      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(interval);
    }
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const file = 'any_file';
    jest.spyOn(path, 'join');
    await readFileAsynchronously(file);
    expect(path.join).toHaveBeenNthCalledWith(1, __dirname, file);
  });

  test('should return null if file does not exist', async () => {
    const file = 'index.ts';
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(file);
    expect(result).toEqual(null);
  });

  test('should return file content if file exists', async () => {
    const file = 'index.ts';
    const fileContent = 'file content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(all, 'readFileAsynchronously')
      .mockReturnValue(Promise.resolve(fileContent));
    const result = await readFileAsynchronously(file);
    expect(result).toEqual(fileContent);
  });
});
