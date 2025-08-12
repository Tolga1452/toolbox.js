import { binomialDistributionProbability } from '../src/functions';

describe('binomialDistributionProbability', () => {
    describe('basic functionality', () => {
        test('should calculate binomial probability correctly for example case', () => {
            // Example from documentation: 4 heads in 6 tosses with p=0.3
            const result = binomialDistributionProbability(4, 6, 0.3);
            expect(result).toBeCloseTo(0.05953499999999999, 10);
        });

        test('should calculate probability for simple cases', () => {
            // 1 success in 2 trials with p=0.5 (fair coin, 1 head in 2 flips)
            expect(binomialDistributionProbability(1, 2, 0.5)).toBeCloseTo(0.5, 10);
            
            // 2 successes in 3 trials with p=0.5
            expect(binomialDistributionProbability(2, 3, 0.5)).toBeCloseTo(0.375, 10);
            
            // 0 successes in 1 trial with p=0.7
            expect(binomialDistributionProbability(0, 1, 0.7)).toBeCloseTo(0.3, 10);
        });

        test('should handle zero trials', () => {
            expect(binomialDistributionProbability(0, 0, 0.5)).toBe(1);
            expect(binomialDistributionProbability(0, 0, 0.3)).toBe(1);
            expect(binomialDistributionProbability(0, 0, 0.8)).toBe(1);
        });

        test('should handle single trial cases', () => {
            expect(binomialDistributionProbability(0, 1, 0.3)).toBeCloseTo(0.7, 10);
            expect(binomialDistributionProbability(1, 1, 0.3)).toBeCloseTo(0.3, 10);
            expect(binomialDistributionProbability(0, 1, 0.8)).toBeCloseTo(0.2, 10);
            expect(binomialDistributionProbability(1, 1, 0.8)).toBeCloseTo(0.8, 10);
        });
    });

    describe('edge cases', () => {
        test('should handle probability of 0', () => {
            expect(binomialDistributionProbability(0, 5, 0)).toBe(1);
            expect(binomialDistributionProbability(1, 5, 0)).toBe(0);
            expect(binomialDistributionProbability(5, 5, 0)).toBe(0);
        });

        test('should handle probability of 1', () => {
            expect(binomialDistributionProbability(0, 5, 1)).toBe(0);
            expect(binomialDistributionProbability(1, 5, 1)).toBe(0);
            expect(binomialDistributionProbability(5, 5, 1)).toBe(1);
        });

        test('should handle all successes case', () => {
            expect(binomialDistributionProbability(3, 3, 0.5)).toBeCloseTo(0.125, 10);
            expect(binomialDistributionProbability(4, 4, 0.2)).toBeCloseTo(0.0016, 10);
            expect(binomialDistributionProbability(2, 2, 0.7)).toBeCloseTo(0.49, 10);
        });

        test('should handle no successes case', () => {
            expect(binomialDistributionProbability(0, 3, 0.5)).toBeCloseTo(0.125, 10);
            expect(binomialDistributionProbability(0, 4, 0.2)).toBeCloseTo(0.4096, 10);
            expect(binomialDistributionProbability(0, 2, 0.7)).toBeCloseTo(0.09, 10);
        });

        test('should handle probability of 0.5 (fair scenarios)', () => {
            expect(binomialDistributionProbability(2, 4, 0.5)).toBeCloseTo(0.375, 10);
            expect(binomialDistributionProbability(3, 6, 0.5)).toBeCloseTo(0.3125, 10);
            expect(binomialDistributionProbability(5, 10, 0.5)).toBeCloseTo(0.24609375, 10);
        });
    });

    describe('input validation - TypeError', () => {
        test('should throw TypeError for non-integer successes', () => {
            expect(() => binomialDistributionProbability(1.5, 5, 0.5)).toThrow(TypeError);
            expect(() => binomialDistributionProbability(1.5, 5, 0.5)).toThrow('`successes` must be an integer');
            expect(() => binomialDistributionProbability(2.1, 5, 0.5)).toThrow(TypeError);
            expect(() => binomialDistributionProbability(-1.5, 5, 0.5)).toThrow(TypeError);
        });

        test('should throw TypeError for non-integer trials', () => {
            expect(() => binomialDistributionProbability(2, 5.5, 0.5)).toThrow(TypeError);
            expect(() => binomialDistributionProbability(2, 5.5, 0.5)).toThrow('`trials` must be an integer');
            expect(() => binomialDistributionProbability(2, 3.7, 0.5)).toThrow(TypeError);
            expect(() => binomialDistributionProbability(2, -2.1, 0.5)).toThrow(TypeError);
        });

        test('should throw TypeError for non-number probability', () => {
            expect(() => binomialDistributionProbability(2, 5, '0.5' as any)).toThrow(TypeError);
            expect(() => binomialDistributionProbability(2, 5, '0.5' as any)).toThrow('`probability` must be a number');
            expect(() => binomialDistributionProbability(2, 5, null as any)).toThrow(TypeError);
            expect(() => binomialDistributionProbability(2, 5, undefined as any)).toThrow(TypeError);
            expect(() => binomialDistributionProbability(2, 5, {} as any)).toThrow(TypeError);
            expect(() => binomialDistributionProbability(2, 5, [] as any)).toThrow(TypeError);
        });
    });

    describe('input validation - RangeError', () => {
        test('should throw RangeError for negative successes', () => {
            expect(() => binomialDistributionProbability(-1, 5, 0.5)).toThrow(RangeError);
            expect(() => binomialDistributionProbability(-1, 5, 0.5)).toThrow('`successes` must be greater than or equal to 0');
            expect(() => binomialDistributionProbability(-5, 10, 0.3)).toThrow(RangeError);
        });

        test('should throw RangeError for negative trials', () => {
            expect(() => binomialDistributionProbability(2, -1, 0.5)).toThrow(RangeError);
            expect(() => binomialDistributionProbability(2, -1, 0.5)).toThrow('`trials` must be greater than or equal to 0');
            expect(() => binomialDistributionProbability(0, -5, 0.3)).toThrow(RangeError);
        });

        test('should throw RangeError when successes > trials', () => {
            expect(() => binomialDistributionProbability(6, 5, 0.5)).toThrow(RangeError);
            expect(() => binomialDistributionProbability(6, 5, 0.5)).toThrow('`successes` must be less than or equal to `trials`');
            expect(() => binomialDistributionProbability(10, 3, 0.3)).toThrow(RangeError);
        });

        test('should throw RangeError for probability < 0', () => {
            expect(() => binomialDistributionProbability(2, 5, -0.1)).toThrow(RangeError);
            expect(() => binomialDistributionProbability(2, 5, -0.1)).toThrow('`probability` must be between 0 and 1, inclusive');
            expect(() => binomialDistributionProbability(1, 3, -1)).toThrow(RangeError);
        });

        test('should throw RangeError for probability > 1', () => {
            expect(() => binomialDistributionProbability(2, 5, 1.1)).toThrow(RangeError);
            expect(() => binomialDistributionProbability(2, 5, 1.1)).toThrow('`probability` must be between 0 and 1, inclusive');
            expect(() => binomialDistributionProbability(1, 3, 2)).toThrow(RangeError);
        });
    });

    describe('mathematical accuracy', () => {
        test('should match known binomial probability values', () => {
            // Known values calculated manually or from reliable sources
            
            // Fair coin: P(2 heads in 4 flips) = C(4,2) * 0.5^2 * 0.5^2 = 6 * 0.25 * 0.25 = 0.375
            expect(binomialDistributionProbability(2, 4, 0.5)).toBeCloseTo(0.375, 10);
            
            // Biased coin: P(1 head in 3 flips, p=0.2) = C(3,1) * 0.2^1 * 0.8^2 = 3 * 0.2 * 0.64 = 0.384
            expect(binomialDistributionProbability(1, 3, 0.2)).toBeCloseTo(0.384, 10);
            
            // P(0 successes in 2 trials, p=0.3) = C(2,0) * 0.3^0 * 0.7^2 = 1 * 1 * 0.49 = 0.49
            expect(binomialDistributionProbability(0, 2, 0.3)).toBeCloseTo(0.49, 10);
        });

        test('should satisfy probability distribution properties', () => {
            // Sum of all probabilities for given n and p should equal 1
            const trials = 4;
            const prob = 0.3;
            let sum = 0;
            
            for (let successes = 0; successes <= trials; successes++) {
                sum += binomialDistributionProbability(successes, trials, prob);
            }
            
            expect(sum).toBeCloseTo(1, 10);
        });

        test('should handle larger number of trials accurately', () => {
            // Test with larger numbers to ensure numerical stability
            expect(binomialDistributionProbability(5, 15, 0.3)).toBeCloseTo(0.20613, 4);;
            expect(binomialDistributionProbability(10, 20, 0.5)).toBeCloseTo(0.1762, 4);
            expect(binomialDistributionProbability(2, 25, 0.1)).toBeCloseTo(0.2659, 4);
        });
    });

    describe('real-world scenarios', () => {
        test('should calculate coin flip probabilities', () => {
            // Fair coin scenarios
            expect(binomialDistributionProbability(3, 5, 0.5)).toBeCloseTo(0.3125, 10); // 3 heads in 5 flips
            expect(binomialDistributionProbability(7, 10, 0.5)).toBeCloseTo(0.1171875, 10); // 7 heads in 10 flips
        });

        test('should calculate success rate scenarios', () => {
            // 80% success rate scenarios
            expect(binomialDistributionProbability(4, 5, 0.8)).toBeCloseTo(0.4096, 10); // 4 out of 5 successes
            expect(binomialDistributionProbability(8, 10, 0.8)).toBeCloseTo(0.301989888, 8); // 8 out of 10 successes
        });

        test('should calculate quality control scenarios', () => {
            // 5% defect rate (95% good)
            expect(binomialDistributionProbability(0, 10, 0.05)).toBeCloseTo(0.59873693924, 8); // 0 defects in 10 items
            expect(binomialDistributionProbability(1, 10, 0.05)).toBeCloseTo(0.31512470486, 8); // 1 defect in 10 items
        });

        test('should calculate medical test scenarios', () => {
            // 90% accuracy rate
            expect(binomialDistributionProbability(9, 10, 0.9)).toBeCloseTo(0.387420489, 8); // 9 correct out of 10
            expect(binomialDistributionProbability(10, 10, 0.9)).toBeCloseTo(0.3486784401, 8); // 10 correct out of 10
        });
    });

    describe('boundary values', () => {
        test('should handle minimum valid inputs', () => {
            expect(binomialDistributionProbability(0, 0, 0)).toBe(1);
            expect(binomialDistributionProbability(0, 0, 1)).toBe(1);
            expect(binomialDistributionProbability(0, 1, 0)).toBe(1);
            expect(binomialDistributionProbability(0, 1, 1)).toBe(0);
        });

        test('should handle probability boundary values', () => {
            expect(binomialDistributionProbability(2, 5, 0)).toBe(0);
            expect(binomialDistributionProbability(5, 5, 1)).toBe(1);
            expect(binomialDistributionProbability(0, 5, 0)).toBe(1);
            expect(binomialDistributionProbability(0, 5, 1)).toBe(0);
        });

        test('should handle equal successes and trials', () => {
            expect(binomialDistributionProbability(5, 5, 0.5)).toBeCloseTo(0.03125, 10);
            expect(binomialDistributionProbability(3, 3, 0.7)).toBeCloseTo(0.343, 10);
            expect(binomialDistributionProbability(1, 1, 0.4)).toBeCloseTo(0.4, 10);
        });
    });

    describe('type consistency', () => {
        test('should always return a number', () => {
            const result1 = binomialDistributionProbability(2, 5, 0.5);
            const result2 = binomialDistributionProbability(0, 0, 0.3);
            const result3 = binomialDistributionProbability(3, 3, 1);
            
            expect(typeof result1).toBe('number');
            expect(typeof result2).toBe('number');
            expect(typeof result3).toBe('number');
        });

        test('should return finite numbers for valid inputs', () => {
            expect(Number.isFinite(binomialDistributionProbability(2, 5, 0.5))).toBe(true);
            expect(Number.isFinite(binomialDistributionProbability(0, 10, 0.1))).toBe(true);
            expect(Number.isFinite(binomialDistributionProbability(8, 15, 0.7))).toBe(true);
        });

        test('should not return NaN for valid inputs', () => {
            expect(Number.isNaN(binomialDistributionProbability(3, 7, 0.4))).toBe(false);
            expect(Number.isNaN(binomialDistributionProbability(0, 5, 0))).toBe(false);
            expect(Number.isNaN(binomialDistributionProbability(5, 5, 1))).toBe(false);
        });
    });

    describe('precision and floating point', () => {
        test('should maintain reasonable precision for common cases', () => {
            // Test that results are consistent and precise
            expect(binomialDistributionProbability(5, 10, 0.5)).toBeCloseTo(0.24609375, 10);
            expect(binomialDistributionProbability(3, 8, 0.25)).toBeCloseTo(0.20764, 4);
        });

        test('should handle very small probabilities', () => {
            expect(binomialDistributionProbability(0, 5, 0.001)).toBeCloseTo(0.995, 3);
            expect(binomialDistributionProbability(1, 5, 0.001)).toBeCloseTo(0.00498, 4);
        });

        test('should handle very high probabilities', () => {
            expect(binomialDistributionProbability(5, 5, 0.999)).toBeCloseTo(0.995, 3);
            expect(binomialDistributionProbability(4, 5, 0.999)).toBeCloseTo(0.00498, 4);
        });
    });
});
