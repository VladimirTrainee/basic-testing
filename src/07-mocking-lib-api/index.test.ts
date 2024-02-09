import axios from 'axios';
import * as all from './index';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const createPath = { baseURL };
    const urlPath = '/todos';
    jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(urlPath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.create).toHaveBeenNthCalledWith(1, createPath);
  });

  test('should perform request to correct provided url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';
    const createPath = { baseURL };
    const instance = axios.create(createPath);
    const urlPath = '/todos';

    jest.spyOn(axios, 'create').mockReturnValue(instance);
    jest.spyOn(instance, 'get');
    await throttledGetDataFromApi(urlPath);
    jest.advanceTimersByTime(THROTTLE_TIME);

    expect(axios.create).toHaveBeenNthCalledWith(1, createPath);
    expect(instance.get).toHaveBeenNthCalledWith(1, urlPath);
  });

  test('should return response data', async () => {
    const urlPath = 'any url path';
    const data = { content: 'content' };

    jest
      .spyOn(all, 'throttledGetDataFromApi')
      .mockReturnValue(Promise.resolve(data));
    const result = await throttledGetDataFromApi(urlPath);
    expect(result).toEqual(data);
  });
});
