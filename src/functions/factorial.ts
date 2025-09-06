/**
 * Returns the factorial of the given integer.
 *
 * @param n The integer to get the factorial of.
 * @returns The factorial.
 * 
 * @example
 * factorial(5); // 120
 */
export function factorial(n: number): number {
    if (!Number.isInteger(n)) throw new TypeError('`n` must be an integer');
    if (n < 0) throw new RangeError('`n` must be 0 or greater');

    let result = 1;

    for (let i = 1; i <= n; i++) {
        result *= i;
    };

    return result;
};
