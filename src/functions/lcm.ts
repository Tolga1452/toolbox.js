import lcmOf2 from '../utils/lcmOf2.js';

/**
 * Calculates the least common multiple (LCM) of multiple integers.
 *
 * @param nums - The integers to calculate the LCM for.
 * @returns The least common multiple of the provided integers.
 *
 * @example
 * lcm(4, 5, 6); // 60
 * lcm(-4, 5);   // 20
 * lcm(0, 5);    // 0
 * lcm(0, 0, 0); // 0
 */
export function lcm(...nums: number[]): number {
    if (nums.length < 2) throw new TypeError('At least two integers are required');

    let current = nums[0]!;

    if (!Number.isInteger(current)) throw new TypeError(`All arguments must be integers. Received ${typeof current} at index 0`);

    if (current === 0) return 0;

    current = Math.abs(current);

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]!;

        if (!Number.isInteger(num)) throw new TypeError(`All arguments must be integers. Received ${typeof num} at index ${i}`);
        if (num === 0) return 0;

        current = lcmOf2(current, num);
    };

    return current;
};
