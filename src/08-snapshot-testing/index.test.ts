import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    type Build = { value: number | null; next: Build | null };
    const start = 2;
    const length = 10;
    const list = Array.from(Array(length), (_, index) => start + index);
    const build = (count: number): Build => {
      const obj = { value: null, next: null };
      if (count < 1) return obj;
      return { value: start + length - count, next: build(count - 1) };
    };
    const result = build(length);
    expect(generateLinkedList(list)).toStrictEqual(result);
  });

  test('should generate linked list from values 2', () => {
    const start = 2;
    const length = 10;
    const list = Array.from(Array(length), (_, index) => start + index);
    const result = generateLinkedList(list);
    expect(result).toMatchSnapshot();
  });
});
