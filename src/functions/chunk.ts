/**
 * Turns the given array into groups of the given size.
 * 
 * @param arr The array to chunk.
 * @param size The size of the chunks.
 * @returns The chunked array.
 * 
 * @example
 * chunk(["red", "green", "blue", "yellow", "orange"], 2); // [["red", "green"], ["blue", "yellow"], ["orange"]]
 */
export function chunk<Item = any>(arr: Item[], size: number): Item[][] {
    if (!Array.isArray(arr)) throw new TypeError('`arr` must be an array');
    if (!Number.isInteger(size)) throw new TypeError('`size` must be an integer');
    if (size <= 0) throw new RangeError('`size` must be greater than 0');

    const newArr: Item[][] = [];

    for (let i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
    };

    return newArr;
};
