import { randomItem } from '../';

describe('randomItem', () => {
    it('should return a random item from the given array', () => {
        const arr = ['red', 'green', 'blue'];
        const actual = randomItem(arr);

        expect(arr).toContain(actual);
    });

    it('should work with arrays of different types', () => {
        const strArr = ['hello', 'world'];
        const numArr = [1, 2, 3];
        const objArr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

        expect(typeof randomItem(strArr)).toBe('string');
        expect(typeof randomItem(numArr)).toBe('number');
        expect(typeof randomItem(objArr)).toBe('object');
    });
});