import gcdOf2 from '../utils/gcdOf2.js';

/**
 * Calculates the greatest common divisor (GCD) of multiple integers.
 *
 * @param nums - The integers to calculate the GCD for.
 * @returns The greatest common divisor of the provided integers.
 *
 * @example
 * gcd(48, 18, 30); // 6
 * gcd(-48, 18);    // 6
 * gcd(0, 5);       // 5
 * gcd(0, 0, 0);    // 0
 */
export function gcd(...nums: number[]): number {
    if (nums.length < 2) throw new TypeError('At least two integers are required');

    let current = nums[0]!;

    if (!Number.isInteger(current)) throw new TypeError(`All arguments must be integers. Received ${typeof current} at index 0`);

    if (current === 1) return 1;

    current = Math.abs(current);

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]!;

        if (!Number.isInteger(num)) throw new TypeError(`All arguments must be integers. Received ${typeof num} at index ${i}`);
        if (num === 0) continue;
        if (num === 1 || num === -1) return 1;

        current = gcdOf2(current, num);
    };

    return current;
};
