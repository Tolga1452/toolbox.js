import { randomInt } from './randomInt.js';

/**
 * Returns a random item from the given array.
 * 
 * @param arr The array to get the item from.
 * @returns The random item from the array.
 * 
 * @example
 * randomItem(["red", "green", "blue"]); // "red"
 */
export function randomItem<Item = any>(arr: Item[]): Item {
    if (!Array.isArray(arr)) throw new TypeError('`arr` must be an array');

    return arr[randomInt(0, arr.length - 1)]!;
};
