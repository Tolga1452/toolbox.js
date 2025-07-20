/**
 * Generates a random number between the given min and max.
 * @deprecated Use the `randomInt()` function instead.
 * 
 * @param min The minimum number.
 * @param max The maximum number.
 * @returns The generated number.
 * 
 * @example
 * randomNumber(0, 10); // 5
 */
export function randomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};
