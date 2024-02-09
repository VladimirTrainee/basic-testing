import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(jest.mocked(console.log).mock.calls).toHaveLength(0);
  });

  test('unmockedFunction should log into console', () => {
    jest.spyOn(console, 'log');
    unmockedFunction();
    expect(jest.mocked(console.log).mock.calls).toHaveLength(1);
  });
});
