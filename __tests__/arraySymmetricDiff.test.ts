import { arraySymmetricDiff } from '../src/functions/arraySymmetricDiff';

describe('arraySymmetricDiff', () => {
    describe('no or one array', () => {
        test('returns [] when called with no arrays', () => {
            expect(arraySymmetricDiff()).toEqual([]);
        });

        test('dedupes single array and preserves first occurrence order', () => {
            const input = [3, 1, 2, 1, 3, 4, 2, 5];
            const result = arraySymmetricDiff(input);
            expect(result).toEqual([3, 1, 2, 4, 5]);
        });
    });

    describe('two arrays behavior', () => {
        test('basic symmetric difference with overlaps and duplicates, preserving order', () => {
            const arr1 = [1, 2, 3];
            const arr2 = [3, 4, 4, 5];
            const result = arraySymmetricDiff(arr1, arr2);
            expect(result).toEqual([1, 2, 4, 5]);
        });

        test('equal arrays result in empty array', () => {
            const arr1 = [1, 2, 3];
            const arr2 = [3, 2, 1]; // same set
            expect(arraySymmetricDiff(arr1, arr2)).toEqual([]);
        });

        test('disjoint arrays produce union in correct order', () => {
            const arr1 = [1, 2, 2];
            const arr2 = [3, 4, 4, 3];
            expect(arraySymmetricDiff(arr1, arr2)).toEqual([1, 2, 3, 4]);
        });

        test('handles empty arrays on either side', () => {
            expect(arraySymmetricDiff([], [1, 1, 2])).toEqual([1, 2]);
            expect(arraySymmetricDiff([1, 2, 2], [])).toEqual([1, 2]);
            expect(arraySymmetricDiff([], [])).toEqual([]);
        });

        test('handles NaN and 0/-0 correctly', () => {
            // NaN toggles properly across sets
            const res1 = arraySymmetricDiff([NaN], [NaN]);
            expect(res1).toEqual([]); // NaN cancels with NaN in Set

            // Distinct presence retains both in order
            const res2 = arraySymmetricDiff([NaN], [0]);
            expect(res2.length).toBe(2);
            expect(Number.isNaN(res2[0] as any)).toBe(true);
            expect(res2[1]).toBe(0);

            // -0 and 0 are treated the same in Set
            const res3 = arraySymmetricDiff([0], [-0]);
            expect(res3).toEqual([]);
        });
    });

    describe('three or more arrays (parity across arrays)', () => {
        test('matches documentation example', () => {
            const result = arraySymmetricDiff([1, 2], [2, 3], [3, 4]);
            expect(result).toEqual([1, 4]);
        });

        test('includes only items present in an odd number of arrays', () => {
            const result = arraySymmetricDiff(
                [1, 2, 3],
                [2, 3, 4],
                [3, 4, 5],
                [1, 5]
            );
            // 1:2x, 2:2x, 3:3x, 4:2x, 5:2x
            expect(result).toEqual([3]);
        });

        test('duplicates within the same array do not affect parity', () => {
            const result = arraySymmetricDiff(
                [1, 1, 1, 2, 2],  // contributes {1,2}
                [1, 2, 2, 2],     // contributes {1,2}
                [2, 2, 2]         // contributes {2}
            );
            // 1: 2 arrays -> even -> exclude
            // 2: 3 arrays -> odd -> include
            expect(result).toEqual([2]);
        });

        test('handles empty arrays mixed with non-empty arrays', () => {
            const result = arraySymmetricDiff([1, 2], [], [2, 3], []);
            // 1: 1x -> include, 2: 2x -> exclude, 3: 1x -> include
            expect(result).toEqual([1, 3]);
        });

        test('preserves order by first appearance across arrays', () => {
            const result = arraySymmetricDiff(
                [10, 20, 30],   // first seen: 10,20,30
                [20, 40],       // first seen: 40
                [50, 10, 40]    // first seen: 50
            );
            // counts: 10(2),20(2),30(1),40(2),50(1) -> keep 30 then 50
            expect(result).toEqual([30, 50]);
        });
    });

    describe('type handling and identity', () => {
        test('works with strings and preserves order', () => {
            const result = arraySymmetricDiff(['a', 'b', 'a'], ['b', 'c'], ['c', 'd']);
            // a:1, b:2, c:2, d:1 -> keep a,d in first-seen order
            expect(result).toEqual(['a', 'd']);
        });

        test('object identity (same reference cancels, different references are distinct)', () => {
            const a = { x: 1 };
            const b = { x: 1 };
            const c = a; // same reference as a

            // Two-array path
            const res1 = arraySymmetricDiff([a, b], [c]); // start Set {a,b}, toggle a -> leaves {b}
            expect(res1).toHaveLength(1);
            expect(res1[0]).toBe(b); // must be the same b object reference

            // Multi-array path: ensure identical refs cancel correctly
            const res2 = arraySymmetricDiff([a], [b], [c]); // a and c cancel (2 arrays), b appears once
            expect(res2).toHaveLength(1);
            expect(res2[0]).toBe(b);
        });
    });
});
