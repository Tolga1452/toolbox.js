import { lcm } from '../src/functions/lcm';

describe('lcm', () => {
    describe('type validation', () => {
        test('should throw TypeError when fewer than two arguments are provided', () => {
            expect(() => (lcm as any)()).toThrow(TypeError);
            expect(() => (lcm as any)()).toThrow('At least two integers are required');

            expect(() => lcm(5 as any)).toThrow(TypeError);
            expect(() => lcm(5 as any)).toThrow('At least two integers are required');
        });

        test('should throw TypeError for non-integer at index 0 with correct message (string)', () => {
            expect(() => lcm('5' as any, 10)).toThrow(TypeError);
            expect(() => lcm('5' as any, 10)).toThrow('All arguments must be integers. Received string at index 0');
        });

        test('should throw TypeError for non-integer at index 0 with correct message (decimal)', () => {
            expect(() => lcm(5.5 as any, 10)).toThrow(TypeError);
            expect(() => lcm(5.5 as any, 10)).toThrow('All arguments must be integers. Received number at index 0');
        });

        test('should throw TypeError for non-integer at later index with correct message (decimal)', () => {
            expect(() => lcm(4, 2.5 as any)).toThrow(TypeError);
            expect(() => lcm(4, 2.5 as any)).toThrow('All arguments must be integers. Received number at index 1');
        });

        test('should throw TypeError for non-integer at later index with correct message (object)', () => {
            expect(() => lcm(4, {} as any)).toThrow(TypeError);
            expect(() => lcm(4, {} as any)).toThrow('All arguments must be integers. Received object at index 1');
        });
    });

    describe('zero handling', () => {
        test('should return 0 when first argument is 0', () => {
            expect(lcm(0, 5)).toBe(0);
        });

        test('should return 0 when any later argument is 0', () => {
            expect(lcm(4, 0)).toBe(0);
            expect(lcm(4, 5, 0, 6)).toBe(0);
        });

        test('should return 0 when all arguments are 0', () => {
            expect(lcm(0, 0)).toBe(0);
            expect(lcm(0, 0, 0)).toBe(0);
        });
    });

    describe('basic functionality', () => {
        test('should compute LCM for two positive integers', () => {
            expect(lcm(6, 8)).toBe(24);
            expect(lcm(21, 6)).toBe(42);
        });

        test('should be commutative for two integers', () => {
            expect(lcm(8, 6)).toBe(24);
            expect(lcm(6, 8)).toBe(24);
        });

        test('should handle identical numbers', () => {
            expect(lcm(5, 5)).toBe(5);
            expect(lcm(-5, -5)).toBe(5);
        });

        test('should compute LCM for multiple integers', () => {
            expect(lcm(4, 5, 6)).toBe(60);
            expect(lcm(12, 18, 30)).toBe(180);
        });
    });

    describe('negative numbers', () => {
        test('should return positive LCM when one argument is negative', () => {
            expect(lcm(-4, 5)).toBe(20);
        });

        test('should return positive LCM when both arguments are negative', () => {
            expect(lcm(-3, -4)).toBe(12);
        });

        test('should handle multiple negatives correctly', () => {
            expect(lcm(-3, 4, -5)).toBe(60);
        });
    });

    describe('edge and larger values', () => {
        test('should handle relatively large safe integers', () => {
            // lcm(123456, 7890) = 162344640? Let's verify by factoring:
            // 123456 = 2^6 * 3 * 643; 7890 = 2 * 3^2 * 5 * 439
            // LCM = 2^6 * 3^2 * 5 * 439 * 643 = 162344640
            expect(lcm(123456, 7890)).toBe(162344640);
        });
    });
});
