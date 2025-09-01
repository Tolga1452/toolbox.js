import { gcd } from '../src/functions/gcd';

describe('gcd', () => {
    describe('type validation', () => {
        test('should throw TypeError for no arguments', () => {
            expect(() => gcd()).toThrow(TypeError);
            expect(() => gcd()).toThrow('At least two integers are required');
        });

        test('should throw TypeError for a single argument', () => {
            expect(() => gcd(5)).toThrow(TypeError);
            expect(() => gcd(5)).toThrow('At least two integers are required');
        });

        test('should throw TypeError with correct message when first arg is non-integer number', () => {
            expect(() => gcd(3.14 as any, 2 as any)).toThrow(
                'All arguments must be integers. Received number at index 0'
            );
        });

        test('should throw TypeError with correct message when first arg is non-number', () => {
            expect(() => gcd('5' as any, 2 as any)).toThrow(
                'All arguments must be integers. Received string at index 0'
            );
        });

        test('should throw TypeError with correct message when later arg is non-integer number', () => {
            expect(() => gcd(10 as any, 2.5 as any)).toThrow(
                'All arguments must be integers. Received number at index 1'
            );
        });

        test('should throw TypeError with correct message when later arg is non-number', () => {
            expect(() => gcd(10 as any, 'x' as any)).toThrow(
                'All arguments must be integers. Received string at index 1'
            );
        });
    });

    describe('basic functionality', () => {
        test('computes gcd for two positive integers', () => {
            expect(gcd(48, 18)).toBe(6);
        });

        test('computes gcd for multiple integers', () => {
            expect(gcd(48, 18, 30)).toBe(6);
            expect(gcd(8, 12, 16, 20)).toBe(4);
        });

        test('handles negative numbers', () => {
            expect(gcd(-48, 18)).toBe(6);
            expect(gcd(12, -18)).toBe(6);
        });

        test('coprime numbers return 1', () => {
            expect(gcd(7, 13)).toBe(1);
        });
    });

    describe('zero handling', () => {
        test('gcd with one zero returns abs of the other number', () => {
            expect(gcd(0, 5)).toBe(5);
            expect(gcd(-42, 0)).toBe(42);
        });

        test('gcd with both zeros is 0', () => {
            expect(gcd(0, 0)).toBe(0);
        });

        test('gcd with multiple zeros and a non-zero returns that non-zero gcd', () => {
            expect(gcd(0, 0, 5)).toBe(5);
            expect(gcd(5, 0, 10, 0)).toBe(5);
        });
    });

    describe('early return with 1 and -1', () => {
        test('returns 1 if first number is 1', () => {
            expect(gcd(1, 99)).toBe(1);
        });

        test('returns 1 if any later number is 1', () => {
            expect(gcd(99, 1)).toBe(1);
        });

        test('returns 1 if any number is -1', () => {
            expect(gcd(999, -1)).toBe(1);
        });
    });

    describe('sign and absolute value properties', () => {
        test('gcd of equal negatives is positive', () => {
            expect(gcd(-7, -7)).toBe(7);
        });

        test('gcd of composite and factor', () => {
            expect(gcd(210, 10)).toBe(10);
        });
    });
});
