import { shuffle } from '../';

describe('shuffle', () => {
    it('should work with arrays of different types', () => {
        const strArr = ['hello', 'world'];
        const numArr = [1, 2, 3];
        const objArr = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

        expect(shuffle(strArr)).toContain('hello');
        expect(shuffle(numArr)).toContain(2);
        expect(shuffle(objArr)).toContainEqual({ id: 2, name: 'Bob' });
    });
});