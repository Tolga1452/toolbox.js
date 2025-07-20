import { binomialCoefficient } from '../src/functions';

describe('binomialCoefficient', () => {
    describe('type validation', () => {
        test('should throw TypeError for non-integer n', () => {
            expect(() => binomialCoefficient(1.5, 1)).toThrow(TypeError);
            expect(() => binomialCoefficient(1.5, 1)).toThrow('`n` must be an integer');
            
            expect(() => binomialCoefficient(3.14, 2)).toThrow(TypeError);
            expect(() => binomialCoefficient(3.14, 2)).toThrow('`n` must be an integer');
            
            expect(() => binomialCoefficient(NaN, 1)).toThrow(TypeError);
            expect(() => binomialCoefficient(NaN, 1)).toThrow('`n` must be an integer');
            
            expect(() => binomialCoefficient(Infinity, 1)).toThrow(TypeError);
            expect(() => binomialCoefficient(Infinity, 1)).toThrow('`n` must be an integer');
        });

        test('should throw TypeError for non-integer k', () => {
            expect(() => binomialCoefficient(5, 1.5)).toThrow(TypeError);
            expect(() => binomialCoefficient(5, 1.5)).toThrow('`k` must be an integer');
            
            expect(() => binomialCoefficient(5, 2.7)).toThrow(TypeError);
            expect(() => binomialCoefficient(5, 2.7)).toThrow('`k` must be an integer');
            
            expect(() => binomialCoefficient(5, NaN)).toThrow(TypeError);
            expect(() => binomialCoefficient(5, NaN)).toThrow('`k` must be an integer');
            
            expect(() => binomialCoefficient(5, Infinity)).toThrow(TypeError);
            expect(() => binomialCoefficient(5, Infinity)).toThrow('`k` must be an integer');
        });

        test('should accept valid integers', () => {
            expect(() => binomialCoefficient(5, 2)).not.toThrow();
            expect(() => binomialCoefficient(0, 0)).not.toThrow();
            expect(() => binomialCoefficient(10, 5)).not.toThrow();
        });
    });

    describe('range validation', () => {
        test('should throw RangeError for negative k', () => {
            expect(() => binomialCoefficient(5, -1)).toThrow(RangeError);
            expect(() => binomialCoefficient(5, -1)).toThrow('`k` must be 0 or greater');
            
            expect(() => binomialCoefficient(10, -5)).toThrow(RangeError);
            expect(() => binomialCoefficient(10, -5)).toThrow('`k` must be 0 or greater');
            
            expect(() => binomialCoefficient(0, -1)).toThrow(RangeError);
            expect(() => binomialCoefficient(0, -1)).toThrow('`k` must be 0 or greater');
        });

        test('should throw RangeError when k > n', () => {
            expect(() => binomialCoefficient(5, 6)).toThrow(RangeError);
            expect(() => binomialCoefficient(5, 6)).toThrow('`k` must be less than or equal to `n`');
            
            expect(() => binomialCoefficient(3, 5)).toThrow(RangeError);
            expect(() => binomialCoefficient(3, 5)).toThrow('`k` must be less than or equal to `n`');
            
            expect(() => binomialCoefficient(0, 1)).toThrow(RangeError);
            expect(() => binomialCoefficient(0, 1)).toThrow('`k` must be less than or equal to `n`');
        });

        test('should accept valid range values', () => {
            expect(() => binomialCoefficient(5, 0)).not.toThrow();
            expect(() => binomialCoefficient(5, 5)).not.toThrow();
            expect(() => binomialCoefficient(5, 3)).not.toThrow();
            expect(() => binomialCoefficient(0, 0)).not.toThrow();
        });
    });

    describe('basic functionality', () => {
        test('should calculate C(n, 0) = 1 for any n', () => {
            expect(binomialCoefficient(0, 0)).toBe(1);
            expect(binomialCoefficient(1, 0)).toBe(1);
            expect(binomialCoefficient(5, 0)).toBe(1);
            expect(binomialCoefficient(10, 0)).toBe(1);
            expect(binomialCoefficient(100, 0)).toBe(1);
        });

        test('should calculate C(n, n) = 1 for any n', () => {
            expect(binomialCoefficient(0, 0)).toBe(1);
            expect(binomialCoefficient(1, 1)).toBe(1);
            expect(binomialCoefficient(5, 5)).toBe(1);
            expect(binomialCoefficient(10, 10)).toBe(1);
            expect(binomialCoefficient(15, 15)).toBe(1);
        });

        test('should calculate C(n, 1) = n for any n > 0', () => {
            expect(binomialCoefficient(1, 1)).toBe(1);
            expect(binomialCoefficient(2, 1)).toBe(2);
            expect(binomialCoefficient(5, 1)).toBe(5);
            expect(binomialCoefficient(10, 1)).toBe(10);
            expect(binomialCoefficient(20, 1)).toBe(20);
        });

        test('should calculate C(n, n-1) = n for any n > 0', () => {
            expect(binomialCoefficient(1, 0)).toBe(1);
            expect(binomialCoefficient(2, 1)).toBe(2);
            expect(binomialCoefficient(5, 4)).toBe(5);
            expect(binomialCoefficient(10, 9)).toBe(10);
            expect(binomialCoefficient(20, 19)).toBe(20);
        });

        test('should calculate documentation example C(5, 2) = 10', () => {
            expect(binomialCoefficient(5, 2)).toBe(10);
        });
    });

    describe('mathematical accuracy', () => {
        test('should calculate known binomial coefficients correctly', () => {
            const knownValues = [
                { n: 0, k: 0, expected: 1 },
                { n: 1, k: 0, expected: 1 },
                { n: 1, k: 1, expected: 1 },
                { n: 2, k: 0, expected: 1 },
                { n: 2, k: 1, expected: 2 },
                { n: 2, k: 2, expected: 1 },
                { n: 3, k: 0, expected: 1 },
                { n: 3, k: 1, expected: 3 },
                { n: 3, k: 2, expected: 3 },
                { n: 3, k: 3, expected: 1 },
                { n: 4, k: 0, expected: 1 },
                { n: 4, k: 1, expected: 4 },
                { n: 4, k: 2, expected: 6 },
                { n: 4, k: 3, expected: 4 },
                { n: 4, k: 4, expected: 1 },
                { n: 5, k: 0, expected: 1 },
                { n: 5, k: 1, expected: 5 },
                { n: 5, k: 2, expected: 10 },
                { n: 5, k: 3, expected: 10 },
                { n: 5, k: 4, expected: 5 },
                { n: 5, k: 5, expected: 1 }
            ];

            knownValues.forEach(({ n, k, expected }) => {
                expect(binomialCoefficient(n, k)).toBe(expected);
            });
        });

        test('should calculate larger binomial coefficients correctly', () => {
            expect(binomialCoefficient(6, 2)).toBe(15);
            expect(binomialCoefficient(6, 3)).toBe(20);
            expect(binomialCoefficient(7, 3)).toBe(35);
            expect(binomialCoefficient(8, 4)).toBe(70);
            expect(binomialCoefficient(10, 2)).toBe(45);
            expect(binomialCoefficient(10, 3)).toBe(120);
            expect(binomialCoefficient(10, 5)).toBe(252);
        });

        test('should verify Pascal\'s triangle relationships', () => {
            // C(n, k) = C(n-1, k-1) + C(n-1, k)
            for (let n = 2; n <= 8; n++) {
                for (let k = 1; k < n; k++) {
                    const current = binomialCoefficient(n, k);
                    const left = binomialCoefficient(n - 1, k - 1);
                    const right = binomialCoefficient(n - 1, k);
                    expect(current).toBe(left + right);
                }
            }
        });
    });

    describe('mathematical properties', () => {
        test('should verify symmetry property C(n, k) = C(n, n-k)', () => {
            const testCases = [
                { n: 5, k: 2 },
                { n: 6, k: 2 },
                { n: 7, k: 3 },
                { n: 8, k: 3 },
                { n: 10, k: 4 },
                { n: 12, k: 5 }
            ];

            testCases.forEach(({ n, k }) => {
                expect(binomialCoefficient(n, k)).toBe(binomialCoefficient(n, n - k));
            });
        });

        test('should verify that sum of row equals 2^n', () => {
            // Sum of C(n, k) for k = 0 to n equals 2^n
            for (let n = 0; n <= 6; n++) {
                let sum = 0;
                for (let k = 0; k <= n; k++) {
                    sum += binomialCoefficient(n, k);
                }
                expect(sum).toBe(Math.pow(2, n));
            }
        });

        test('should verify binomial coefficient formula', () => {
            // C(n, k) = n! / (k! * (n-k)!)
            // This is implicitly tested by using factorial function
            expect(binomialCoefficient(6, 2)).toBe(720 / (2 * 24)); // 6! / (2! * 4!)
            expect(binomialCoefficient(7, 3)).toBe(5040 / (6 * 24)); // 7! / (3! * 4!)
        });
    });

    describe('edge cases and boundary values', () => {
        test('should handle minimum valid values', () => {
            expect(binomialCoefficient(0, 0)).toBe(1);
        });

        test('should handle cases where k = 0', () => {
            for (let n = 0; n <= 10; n++) {
                expect(binomialCoefficient(n, 0)).toBe(1);
            }
        });

        test('should handle cases where k = n', () => {
            for (let n = 0; n <= 10; n++) {
                expect(binomialCoefficient(n, n)).toBe(1);
            }
        });

        test('should handle moderately large values', () => {
            expect(binomialCoefficient(12, 6)).toBe(924);
            expect(binomialCoefficient(13, 6)).toBe(1716);
            expect(binomialCoefficient(14, 7)).toBe(3432);
        });

        test('should return integers for all valid inputs', () => {
            for (let n = 0; n <= 10; n++) {
                for (let k = 0; k <= n; k++) {
                    const result = binomialCoefficient(n, k);
                    expect(Number.isInteger(result)).toBe(true);
                    expect(result).toBeGreaterThan(0);
                }
            }
        });
    });

    describe('dependency integration', () => {
        test('should properly use factorial function', () => {
            // Test that the function correctly integrates with factorial
            // C(4, 2) = 4! / (2! * 2!) = 24 / (2 * 2) = 6
            expect(binomialCoefficient(4, 2)).toBe(6);
            
            // C(5, 3) = 5! / (3! * 2!) = 120 / (6 * 2) = 10
            expect(binomialCoefficient(5, 3)).toBe(10);
        });

        test('should handle factorial edge cases correctly', () => {
            // When k = 0, factorial(0) = 1
            expect(binomialCoefficient(5, 0)).toBe(1);
            
            // When k = n, factorial(n-k) = factorial(0) = 1
            expect(binomialCoefficient(5, 5)).toBe(1);
        });
    });

    describe('real-world combinatorial problems', () => {
        test('should solve combination problems correctly', () => {
            // Choose 2 items from 5: C(5, 2) = 10
            expect(binomialCoefficient(5, 2)).toBe(10);
            
            // Choose 3 items from 7: C(7, 3) = 35
            expect(binomialCoefficient(7, 3)).toBe(35);
            
            // Choose 4 items from 8: C(8, 4) = 70
            expect(binomialCoefficient(8, 4)).toBe(70);
        });

        test('should handle common lottery-style problems', () => {
            // Choose 6 numbers from 49: C(49, 6) would be very large
            // Test smaller versions
            expect(binomialCoefficient(10, 3)).toBe(120);
            expect(binomialCoefficient(12, 4)).toBe(495);
        });

        test('should handle team selection scenarios', () => {
            // Choose 5 players from 15: C(15, 5) would be calculated
            // Test smaller team selections
            expect(binomialCoefficient(8, 3)).toBe(56); // 3 players from 8
            expect(binomialCoefficient(11, 4)).toBe(330); // 4 players from 11
        });
    });

    describe('limits', () => {
        test('should maintain precision for reasonable inputs', () => {
            // Test that results are exact integers
            expect(binomialCoefficient(10, 5)).toBe(252);
            expect(binomialCoefficient(10, 5) % 1).toBe(0); // Should be a whole number
        });

        test('should handle calculations within safe integer range', () => {
            const result = binomialCoefficient(15, 7);
            expect(Number.isSafeInteger(result)).toBe(true);
            expect(result).toBe(6435);
        });
    });

    describe('type consistency', () => {
        test('should always return a number', () => {
            for (let n = 0; n <= 8; n++) {
                for (let k = 0; k <= n; k++) {
                    const result = binomialCoefficient(n, k);
                    expect(typeof result).toBe('number');
                    expect(Number.isNaN(result)).toBe(false);
                    expect(Number.isFinite(result)).toBe(true);
                }
            }
        });

        test('should return positive integers for all valid inputs', () => {
            for (let n = 0; n <= 6; n++) {
                for (let k = 0; k <= n; k++) {
                    const result = binomialCoefficient(n, k);
                    expect(result).toBeGreaterThan(0);
                    expect(Number.isInteger(result)).toBe(true);
                }
            }
        });
    });

    describe('documentation examples and common cases', () => {
        test('should match the documented example', () => {
            // Test the exact example from the JSDoc
            expect(binomialCoefficient(5, 2)).toBe(10);
        });

        test('should work with other common textbook examples', () => {
            expect(binomialCoefficient(4, 2)).toBe(6); // "4 choose 2"
            expect(binomialCoefficient(6, 3)).toBe(20); // "6 choose 3"
            expect(binomialCoefficient(8, 2)).toBe(28); // "8 choose 2"
            expect(binomialCoefficient(9, 4)).toBe(126); // "9 choose 4"
        });

        test('should handle probability and statistics examples', () => {
            // Common examples from probability theory
            expect(binomialCoefficient(10, 2)).toBe(45); // Ways to choose 2 from 10
            expect(binomialCoefficient(7, 2)).toBe(21); // Ways to choose 2 from 7
            expect(binomialCoefficient(6, 4)).toBe(15); // Ways to choose 4 from 6
        });
    });

    describe('error handling completeness', () => {
        test('should validate both parameters independently', () => {
            // Test that both n and k are validated separately
            expect(() => binomialCoefficient(1.5, 2.5)).toThrow('`n` must be an integer');
            expect(() => binomialCoefficient(5, 2.5)).toThrow('`k` must be an integer');
        });

        test('should check range after type validation', () => {
            // Range errors should only occur with valid integers
            expect(() => binomialCoefficient(5, 6)).toThrow('`k` must be less than or equal to `n`');
            expect(() => binomialCoefficient(3, -1)).toThrow('`k` must be 0 or greater');
        });

        test('should provide specific error messages', () => {
            // Verify exact error message strings
            expect(() => binomialCoefficient(1.5, 1)).toThrow('`n` must be an integer');
            expect(() => binomialCoefficient(5, 1.5)).toThrow('`k` must be an integer');
            expect(() => binomialCoefficient(5, -1)).toThrow('`k` must be 0 or greater');
            expect(() => binomialCoefficient(5, 6)).toThrow('`k` must be less than or equal to `n`');
        });
    });
});
