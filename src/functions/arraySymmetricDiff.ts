/**
 * Computes the symmetric difference of multiple arrays.
 * 
 * Note: TypeScript automatically expects all other arrays to be same as the first one.
 * If you get any type errors, try specifying the type explicitly or just use `any`. E.g. `arraySymmetricDiff<any>(...)`
 * 
 * @param arrays - Arrays to compute the symmetric difference from.
 * @returns An array containing the symmetric difference of the input arrays.
 * 
 * @example
 * arraySymmetricDiff([1, 2], [2, 3], [3, 4]) // [1, 4]
 */
export function arraySymmetricDiff<Item = any>(...arrays: Item[][]): Item[] {
    if (arrays.length === 0) return [];
    else if (arrays.length === 1) return Array.from(new Set(arrays[0]));
    else if (arrays.length === 2) {
        if (arrays[0] === arrays[1]) return [];

        let arr1 = new Set(arrays[0]);
        let arr2 = new Set(arrays[1]);

        if (arr1.size === 0) return Array.from(arr2);
        if (arr2.size === 0) return Array.from(arr1);

        if (arr2.size > arr1.size) [arr1, arr2] = [arr2, arr1];

        for (const item of arr2) {
            if (arr1.has(item)) arr1.delete(item);
            else arr1.add(item);
        };

        return Array.from(arr1);
    } else {
        const diff = new Set<Item>();
        const set = new Set<Item>();

        for (const array of arrays) {
            if (array.length === 0) continue;

            set.clear();

            for (const item of array) {
                if (set.has(item)) continue;

                set.add(item);

                if (diff.has(item)) diff.delete(item);
                else diff.add(item);
            };
        };

        return Array.from(diff);
    };
};
