/**
 * Shuffles the given array.
 * 
 * @param arr The array to shuffle.
 * @returns The shuffled array.
 * 
 * @example
 * shuffle(["red", "green", "blue"]); // ["blue", "red", "green"]
 */
export function shuffle<Item = any>(arr: Item[]): Item[] {
    if (!Array.isArray(arr)) throw new TypeError('`arr` must be an array');

    const newArr = [...arr];

    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [newArr[i] as Item, newArr[j] as Item] = [newArr[j] as Item, newArr[i] as Item];
    };

    return newArr;
};
