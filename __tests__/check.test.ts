import { check } from '../';

describe('check', () => {
    it('should return the first parameter if the value is true', () => {
        expect(check(true, 'Hello', 'World')).toEqual('Hello');
        expect(check('text', 'Hello', 'World')).toEqual('Hello');
        expect(check(1, 'Hello', 'World')).toEqual('Hello');
    });

    it('should return the second parameter if the value is false', () => {
        expect(check(false, 'Hello', 'World')).toEqual('World');
        expect(check('', 'Hello', 'World')).toEqual('World');
        expect(check(0, 'Hello', 'World')).toEqual('World');
    });

    it('should work with any value', () => {
        const values = [true, false, 'text', '', 1, 0, {}, [], null, undefined];

        for (const value of values) {
            expect(typeof check(value, 1, 2)).toBe('number');
        }
    });
});