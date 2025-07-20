/**
 * Generates a random integer between the given minimum and maximum numbers.
 * 
 * @param min The minimum number (if decimal, will be ceiled).
 * @param max The maximum number (if decimal, will be floored).
 * @returns The generated integer.
 * 
 * @example
 * randomInt(0, 10); // 5
 */
export function randomInt(min: number, max: number): number {
    if (typeof min !== 'number' || typeof max !== 'number') throw new TypeError('Both `min` and `max` must be numbers');

    min = Math.ceil(min);
    max = Math.floor(max);

    if (min > max) throw new RangeError('`min` must be less than or equal to `max`');

    return Math.floor(Math.random() * (max - min + 1)) + min;
};
