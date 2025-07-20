import { factorial } from '../src/functions';

describe('factorial', () => {
    describe('type validation', () => {
        test('should throw TypeError for non-integer inputs', () => {
            expect(() => factorial(1.5)).toThrow(TypeError);
            expect(() => factorial(1.5)).toThrow('`n` must be an integer');
            
            expect(() => factorial(3.14)).toThrow(TypeError);
            expect(() => factorial(3.14)).toThrow('`n` must be an integer');
            
            expect(() => factorial(0.1)).toThrow(TypeError);
            expect(() => factorial(0.1)).toThrow('`n` must be an integer');
            
            expect(() => factorial(NaN)).toThrow(TypeError);
            expect(() => factorial(NaN)).toThrow('`n` must be an integer');
            
            expect(() => factorial(Infinity)).toThrow(TypeError);
            expect(() => factorial(Infinity)).toThrow('`n` must be an integer');
            
            expect(() => factorial(-Infinity)).toThrow(TypeError);
            expect(() => factorial(-Infinity)).toThrow('`n` must be an integer');
        });

        test('should accept valid integers', () => {
            expect(() => factorial(0)).not.toThrow();
            expect(() => factorial(1)).not.toThrow();
            expect(() => factorial(5)).not.toThrow();
            expect(() => factorial(10)).not.toThrow();
        });
    });

    describe('range validation', () => {
        test('should throw RangeError for negative integers', () => {
            expect(() => factorial(-1)).toThrow(RangeError);
            expect(() => factorial(-1)).toThrow('`n` must be 0 or greater');
            
            expect(() => factorial(-5)).toThrow(RangeError);
            expect(() => factorial(-5)).toThrow('`n` must be 0 or greater');
            
            expect(() => factorial(-100)).toThrow(RangeError);
            expect(() => factorial(-100)).toThrow('`n` must be 0 or greater');
        });

        test('should accept zero and positive integers', () => {
            expect(() => factorial(0)).not.toThrow();
            expect(() => factorial(1)).not.toThrow();
            expect(() => factorial(10)).not.toThrow();
        });
    });

    describe('basic functionality', () => {
        test('should return 1 for factorial of 0', () => {
            expect(factorial(0)).toBe(1);
        });

        test('should return 1 for factorial of 1', () => {
            expect(factorial(1)).toBe(1);
        });

        test('should calculate factorial of 2', () => {
            expect(factorial(2)).toBe(2);
        });

        test('should calculate factorial of 3', () => {
            expect(factorial(3)).toBe(6);
        });

        test('should calculate factorial of 4', () => {
            expect(factorial(4)).toBe(24);
        });

        test('should calculate factorial of 5 (documentation example)', () => {
            expect(factorial(5)).toBe(120);
        });

        test('should calculate factorial of 6', () => {
            expect(factorial(6)).toBe(720);
        });

        test('should calculate factorial of 7', () => {
            expect(factorial(7)).toBe(5040);
        });
    });

    describe('mathematical accuracy', () => {
        test('should calculate known factorial values correctly', () => {
            const knownFactorials = [
                { n: 0, expected: 1 },
                { n: 1, expected: 1 },
                { n: 2, expected: 2 },
                { n: 3, expected: 6 },
                { n: 4, expected: 24 },
                { n: 5, expected: 120 },
                { n: 6, expected: 720 },
                { n: 7, expected: 5040 },
                { n: 8, expected: 40320 },
                { n: 9, expected: 362880 },
                { n: 10, expected: 3628800 }
            ];

            knownFactorials.forEach(({ n, expected }) => {
                expect(factorial(n)).toBe(expected);
            });
        });

        test('should follow factorial mathematical property: n! = n * (n-1)!', () => {
            for (let i = 2; i <= 10; i++) {
                expect(factorial(i)).toBe(i * factorial(i - 1));
            }
        });

        test('should calculate larger factorial values', () => {
            expect(factorial(11)).toBe(39916800);
            expect(factorial(12)).toBe(479001600);
            expect(factorial(13)).toBe(6227020800);
        });
    });

    describe('edge cases and boundary values', () => {
        test('should handle the base case correctly', () => {
            expect(factorial(0)).toBe(1);
        });

        test('should return numbers for all valid inputs', () => {
            for (let i = 0; i <= 15; i++) {
                const result = factorial(i);
                expect(typeof result).toBe('number');
                expect(Number.isInteger(result)).toBe(true);
                expect(result).toBeGreaterThan(0);
            }
        });

        test('should handle reasonably large values within safe integer range', () => {
            // factorial(15) = 1307674368000 (still within Number.MAX_SAFE_INTEGER)
            expect(factorial(15)).toBe(1307674368000);
            expect(Number.isSafeInteger(factorial(15))).toBe(true);
        });

        test('should produce increasing values for increasing inputs', () => {
            let previous = factorial(1);
            for (let i = 2; i <= 10; i++) {
                const current = factorial(i);
                expect(current).toBeGreaterThan(previous);
                previous = current;
            }
        });
    });

    describe('algorithm verification', () => {
        test('should use iterative approach correctly', () => {
            // Verify that the function works as expected by testing the iterative logic
            // This is implicitly tested by the mathematical accuracy tests
            expect(factorial(4)).toBe(1 * 1 * 2 * 3 * 4);
            expect(factorial(5)).toBe(1 * 1 * 2 * 3 * 4 * 5);
        });

        test('should handle consecutive calculations correctly', () => {
            // Test multiple calls to ensure no state is maintained between calls
            expect(factorial(3)).toBe(6);
            expect(factorial(4)).toBe(24);
            expect(factorial(3)).toBe(6); // Should still be 6
            expect(factorial(5)).toBe(120);
            expect(factorial(0)).toBe(1);
        });
    });

    describe('performance and limits', () => {
        test('should complete calculations in reasonable time', () => {
            const start = performance.now();
            factorial(15);
            const end = performance.now();
            expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
        });

        test('should maintain precision for reasonable inputs', () => {
            // Test that results are exact integers, not floating point approximations
            expect(factorial(10)).toBe(3628800);
            expect(factorial(10) % 1).toBe(0); // Should be a whole number
        });
    });

    describe('type consistency', () => {
        test('should always return a number', () => {
            for (let i = 0; i <= 10; i++) {
                const result = factorial(i);
                expect(typeof result).toBe('number');
                expect(Number.isNaN(result)).toBe(false);
                expect(Number.isFinite(result)).toBe(true);
            }
        });

        test('should return positive integers for all valid inputs', () => {
            for (let i = 0; i <= 10; i++) {
                const result = factorial(i);
                expect(result).toBeGreaterThan(0);
                expect(Number.isInteger(result)).toBe(true);
            }
        });
    });

    describe('documentation examples', () => {
        test('should match the documented example', () => {
            // Test the exact example from the JSDoc
            expect(factorial(5)).toBe(120);
        });

        test('should work with other common examples', () => {
            expect(factorial(0)).toBe(1); // 0! = 1 by definition
            expect(factorial(1)).toBe(1); // 1! = 1
            expect(factorial(3)).toBe(6); // 3! = 3 × 2 × 1 = 6
            expect(factorial(4)).toBe(24); // 4! = 4 × 3 × 2 × 1 = 24
        });
    });
});
