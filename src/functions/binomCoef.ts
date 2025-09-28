import { factorial } from './factorial.js';

/**
 * Returns the binomial coefficient of the given integers.
 * 
 * @param n The first integer.
 * @param k The second integer. Must be 0 or greater and less than or equal to `n`.
 * @returns The binomial coefficient of `n` and `k`.
 * 
 * @example
 * binomCoef(5, 2); // 10
 */
export function binomCoef(n: number, k: number): number {
    if (!Number.isInteger(n)) throw new TypeError('`n` must be an integer');
    if (!Number.isInteger(k)) throw new TypeError('`k` must be an integer');
    if (0 > k) throw new RangeError('`k` must be 0 or greater');
    if (k > n) throw new RangeError('`k` must be less than or equal to `n`');

    return factorial(n) / (factorial(k) * factorial(n - k));
};
