import { chunk } from '../';

describe('chunk', () => {
    test('chunks an array into groups of the given size', () => {
        const arr = ['red', 'green', 'blue', 'yellow', 'orange'];
        const size = 2;
        const expected = [['red', 'green'], ['blue', 'yellow'], ['orange']];

        expect(chunk(arr, size)).toEqual(expected);
    });

    test('returns an empty array if given an empty array', () => {
        const arr: any[] = [];
        const size = 2;
        const expected: any[][] = [];

        expect(chunk(arr, size)).toEqual(expected);
    });

    test('handles edge cases correctly', () => {
        const arr = ['red', 'green', 'blue', 'yellow', 'orange'];
        const size = 1;
        const expected = [['red'], ['green'], ['blue'], ['yellow'], ['orange']];

        expect(chunk(arr, size)).toEqual(expected);
    });
});