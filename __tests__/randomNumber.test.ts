import { randomNumber } from '../src/functions';

describe('randomNumber', () => {
    describe('basic functionality', () => {
        test('should return a number within the specified range', () => {
            const min = 1;
            const max = 10;
            const result = randomNumber(min, max);
            
            expect(typeof result).toBe('number');
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        test('should return integer values only', () => {
            for (let i = 0; i < 10; i++) {
                const result = randomNumber(1, 10);
                expect(Number.isInteger(result)).toBe(true);
            }
        });

        test('should handle single value range (min equals max)', () => {
            const value = 5;
            const result = randomNumber(value, value);
            expect(result).toBe(value);
        });
    });

    describe('boundary tests', () => {
        test('should include both min and max values in possible results', () => {
            const min = 1;
            const max = 3;
            const results = new Set();
            
            // Run multiple times to increase chance of hitting boundaries
            for (let i = 0; i < 100; i++) {
                results.add(randomNumber(min, max));
            }
            
            expect(results.has(min)).toBe(true);
            expect(results.has(max)).toBe(true);
        });

        test('should work with zero as min or max', () => {
            const result1 = randomNumber(0, 5);
            expect(result1).toBeGreaterThanOrEqual(0);
            expect(result1).toBeLessThanOrEqual(5);

            const result2 = randomNumber(-5, 0);
            expect(result2).toBeGreaterThanOrEqual(-5);
            expect(result2).toBeLessThanOrEqual(0);
        });

        test('should work with negative numbers', () => {
            const min = -10;
            const max = -1;
            const result = randomNumber(min, max);
            
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        test('should work with large numbers', () => {
            const min = 1000000;
            const max = 2000000;
            const result = randomNumber(min, max);
            
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });
    });

    describe('decimal input handling', () => {
        test('should ceil min and floor max for decimal inputs', () => {
            // min = 1.7 should become 2 (ceiled)
            // max = 5.9 should become 5 (floored)
            const result = randomNumber(1.7, 5.9);
            
            expect(result).toBeGreaterThanOrEqual(2);
            expect(result).toBeLessThanOrEqual(5);
        });

        test('should handle when ceiled min is greater than floored max', () => {
            // min = 5.1 -> ceil = 6, max = 5.9 -> floor = 5
            // This should result in max < min after processing
            const result = randomNumber(5.1, 5.9);
            
            // The function should still work, likely returning the min value
            expect(typeof result).toBe('number');
        });

        test('should work correctly with decimal boundaries', () => {
            const result = randomNumber(0.1, 2.9);
            // min becomes 1 (ceil of 0.1), max becomes 2 (floor of 2.9)
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(2);
        });
    });

    describe('argument order', () => {
        test('should work when min is greater than max', () => {
            // Testing if function handles reversed arguments
            const result = randomNumber(10, 1);
            expect(typeof result).toBe('number');
            // Since min is ceiled to 10 and max is floored to 1, 
            // this tests edge case behavior
        });
    });

    describe('randomness distribution', () => {
        test('should generate different values over multiple calls', () => {
            const results = new Set();
            const min = 1;
            const max = 100;
            
            for (let i = 0; i < 50; i++) {
                results.add(randomNumber(min, max));
            }
            
            // Should generate at least some different values
            expect(results.size).toBeGreaterThan(1);
        });

        test('should distribute values across the range', () => {
            const min = 1;
            const max = 4;
            const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
            
            // Generate many samples
            for (let i = 0; i < 400; i++) {
                const result = randomNumber(min, max);
                counts[result as keyof typeof counts]++;
            }
            
            // Each value should appear at least once in 400 trials
            expect(counts[1]).toBeGreaterThan(0);
            expect(counts[2]).toBeGreaterThan(0);
            expect(counts[3]).toBeGreaterThan(0);
            expect(counts[4]).toBeGreaterThan(0);
        });
    });

    describe('edge cases', () => {
        test('should handle very small ranges', () => {
            const result = randomNumber(0, 1);
            expect([0, 1]).toContain(result);
        });

        test('should handle negative to positive range', () => {
            const result = randomNumber(-5, 5);
            expect(result).toBeGreaterThanOrEqual(-5);
            expect(result).toBeLessThanOrEqual(5);
        });

        test('should consistently return the same value for identical min/max', () => {
            for (let i = 0; i < 10; i++) {
                expect(randomNumber(42, 42)).toBe(42);
            }
        });
    });
});
