import { randomInt } from '../src/functions';

describe('randomInt', () => {
    describe('type validation', () => {
        test('should throw TypeError for non-number min', () => {
            expect(() => randomInt('5' as any, 10)).toThrow(TypeError);
            expect(() => randomInt(null as any, 10)).toThrow(TypeError);
            expect(() => randomInt(undefined as any, 10)).toThrow(TypeError);
            expect(() => randomInt({} as any, 10)).toThrow(TypeError);
            expect(() => randomInt([] as any, 10)).toThrow(TypeError);
        });

        test('should throw TypeError for non-number max', () => {
            expect(() => randomInt(5, '10' as any)).toThrow(TypeError);
            expect(() => randomInt(5, null as any)).toThrow(TypeError);
            expect(() => randomInt(5, undefined as any)).toThrow(TypeError);
            expect(() => randomInt(5, {} as any)).toThrow(TypeError);
            expect(() => randomInt(5, [] as any)).toThrow(TypeError);
        });

        test('should throw TypeError for both non-number arguments', () => {
            expect(() => randomInt('5' as any, '10' as any)).toThrow(TypeError);
        });

        test('should throw TypeError with correct message', () => {
            expect(() => randomInt('5' as any, 10)).toThrow('Both `min` and `max` must be numbers');
        });
    });

    describe('range validation', () => {
        test('should throw RangeError when min > max after processing', () => {
            // 5.1 ceiled = 6, 5.9 floored = 5, so 6 > 5
            expect(() => randomInt(5.1, 5.9)).toThrow(RangeError);
        });

        test('should throw RangeError when min clearly > max', () => {
            expect(() => randomInt(10, 5)).toThrow(RangeError);
        });

        test('should throw RangeError with correct message', () => {
            expect(() => randomInt(10, 5)).toThrow('`min` must be less than or equal to `max`');
        });

        test('should not throw when min equals max after processing', () => {
            expect(() => randomInt(5, 5)).not.toThrow();
            expect(() => randomInt(5.1, 5.9)).toThrow(); // 6 > 5
            expect(() => randomInt(5.0, 5.9)).not.toThrow(); // 5 <= 5
        });
    });

    describe('basic functionality', () => {
        test('should return an integer within the specified range', () => {
            const min = 1;
            const max = 10;
            const result = randomInt(min, max);
            
            expect(typeof result).toBe('number');
            expect(Number.isInteger(result)).toBe(true);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        test('should return integer values only', () => {
            for (let i = 0; i < 20; i++) {
                const result = randomInt(1, 10);
                expect(Number.isInteger(result)).toBe(true);
            }
        });

        test('should handle single value range (min equals max)', () => {
            const value = 5;
            const result = randomInt(value, value);
            expect(result).toBe(value);
        });

        test('should consistently return same value for identical min/max', () => {
            for (let i = 0; i < 10; i++) {
                expect(randomInt(42, 42)).toBe(42);
            }
        });
    });

    describe('decimal input handling', () => {
        test('should ceil min and floor max for decimal inputs', () => {
            // min = 1.7 should become 2 (ceiled)
            // max = 5.3 should become 5 (floored)
            const result = randomInt(1.7, 5.3);
            
            expect(result).toBeGreaterThanOrEqual(2);
            expect(result).toBeLessThanOrEqual(5);
        });

        test('should work correctly with decimal boundaries', () => {
            const result = randomInt(0.1, 2.9);
            // min becomes 1 (ceil of 0.1), max becomes 2 (floor of 2.9)
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(2);
            expect([1, 2]).toContain(result);
        });

        test('should handle negative decimals correctly', () => {
            const result = randomInt(-2.7, -1.1);
            // min becomes -2 (ceil of -2.7), max becomes -2 (floor of -1.1)
            expect(result).toBe(-2);
        });

        test('should handle mixed positive/negative decimals', () => {
            const result = randomInt(-1.9, 1.9);
            // min becomes -1 (ceil of -1.9), max becomes 1 (floor of 1.9)
            expect(result).toBeGreaterThanOrEqual(-1);
            expect(result).toBeLessThanOrEqual(1);
            expect([-1, 0, 1]).toContain(result);
        });
    });

    describe('boundary tests', () => {
        test('should include both min and max values in possible results', () => {
            const min = 1;
            const max = 3;
            const results = new Set();
            
            // Run multiple times to increase chance of hitting boundaries
            for (let i = 0; i < 200; i++) {
                results.add(randomInt(min, max));
            }
            
            expect(results.has(min)).toBe(true);
            expect(results.has(max)).toBe(true);
        });

        test('should work with zero as min or max', () => {
            const result1 = randomInt(0, 5);
            expect(result1).toBeGreaterThanOrEqual(0);
            expect(result1).toBeLessThanOrEqual(5);

            const result2 = randomInt(-5, 0);
            expect(result2).toBeGreaterThanOrEqual(-5);
            expect(result2).toBeLessThanOrEqual(0);
        });

        test('should work with negative numbers', () => {
            const min = -10;
            const max = -1;
            const result = randomInt(min, max);
            
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        test('should work with large numbers', () => {
            const min = 1000000;
            const max = 2000000;
            const result = randomInt(min, max);
            
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });
    });

    describe('edge cases', () => {
        test('should handle very small ranges', () => {
            const result = randomInt(0, 1);
            expect([0, 1]).toContain(result);
        });

        test('should handle negative to positive range', () => {
            const result = randomInt(-5, 5);
            expect(result).toBeGreaterThanOrEqual(-5);
            expect(result).toBeLessThanOrEqual(5);
        });

        test('should handle zero range', () => {
            const result = randomInt(0, 0);
            expect(result).toBe(0);
        });

        test('should handle negative zero range', () => {
            const result = randomInt(-1, -1);
            expect(result).toBe(-1);
        });
    });

    describe('randomness distribution', () => {
        test('should generate different values over multiple calls', () => {
            const results = new Set();
            const min = 1;
            const max = 50;
            
            for (let i = 0; i < 100; i++) {
                results.add(randomInt(min, max));
            }
            
            // Should generate at least some different values
            expect(results.size).toBeGreaterThan(5);
        });

        test('should distribute values across the range', () => {
            const min = 1;
            const max = 4;
            const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
            
            // Generate many samples
            for (let i = 0; i < 800; i++) {
                const result = randomInt(min, max);
                counts[result as keyof typeof counts]++;
            }
            
            // Each value should appear at least once in 800 trials
            expect(counts[1]).toBeGreaterThan(0);
            expect(counts[2]).toBeGreaterThan(0);
            expect(counts[3]).toBeGreaterThan(0);
            expect(counts[4]).toBeGreaterThan(0);
        });

        test('should not favor any particular value in small range', () => {
            const min = 1;
            const max = 2;
            let count1 = 0;
            let count2 = 0;
            
            for (let i = 0; i < 1000; i++) {
                const result = randomInt(min, max);
                if (result === 1) count1++;
                if (result === 2) count2++;
            }
            
            // Both values should appear (not testing exact distribution due to randomness)
            expect(count1).toBeGreaterThan(0);
            expect(count2).toBeGreaterThan(0);
            expect(count1 + count2).toBe(1000);
        });
    });

    describe('special number values', () => {
        test('should handle very large integers', () => {
            const min = Number.MAX_SAFE_INTEGER - 10;
            const max = Number.MAX_SAFE_INTEGER;
            const result = randomInt(min, max);
            
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        test('should handle very small negative integers', () => {
            const min = Number.MIN_SAFE_INTEGER;
            const max = Number.MIN_SAFE_INTEGER + 10;
            const result = randomInt(min, max);
            
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });
    });
});
