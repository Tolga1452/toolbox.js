import { chunk } from '../src/functions';

describe('chunk', () => {
    describe('type validation', () => {
        test('should throw TypeError for non-array input', () => {
            expect(() => chunk('not an array' as any, 2)).toThrow(TypeError);
            expect(() => chunk(123 as any, 2)).toThrow(TypeError);
            expect(() => chunk(null as any, 2)).toThrow(TypeError);
            expect(() => chunk(undefined as any, 2)).toThrow(TypeError);
            expect(() => chunk({} as any, 2)).toThrow(TypeError);
        });

        test('should throw TypeError for non-number size', () => {
            expect(() => chunk([1, 2, 3], 'not a number' as any)).toThrow(TypeError);
            expect(() => chunk([1, 2, 3], null as any)).toThrow(TypeError);
            expect(() => chunk([1, 2, 3], undefined as any)).toThrow(TypeError);
            expect(() => chunk([1, 2, 3], {} as any)).toThrow(TypeError);
            expect(() => chunk([1, 2, 3], [] as any)).toThrow(TypeError);
        });

        test('should throw TypeError for non-integer size', () => {
            expect(() => chunk([1, 2, 3], 2.5)).toThrow(TypeError);
            expect(() => chunk([1, 2, 3], 1.1)).toThrow(TypeError);
            expect(() => chunk([1, 2, 3], Math.PI)).toThrow(TypeError);
        });

        test('should throw TypeError with correct messages', () => {
            expect(() => chunk('not an array' as any, 2)).toThrow('`arr` must be an array');
            expect(() => chunk([1, 2, 3], 'not a number' as any)).toThrow('`size` must be an integer');
            expect(() => chunk([1, 2, 3], 2.5)).toThrow('`size` must be an integer');
        });
    });

    describe('range validation', () => {
        test('should throw RangeError for size <= 0', () => {
            expect(() => chunk([1, 2, 3], 0)).toThrow(RangeError);
            expect(() => chunk([1, 2, 3], -1)).toThrow(RangeError);
            expect(() => chunk([1, 2, 3], -10)).toThrow(RangeError);
        });

        test('should throw RangeError with correct message', () => {
            expect(() => chunk([1, 2, 3], 0)).toThrow('`size` must be greater than 0');
        });
    });

    describe('basic functionality', () => {
        test('should chunk array into groups of specified size', () => {
            const result = chunk([1, 2, 3, 4, 5, 6], 2);
            expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
        });

        test('should handle arrays that do not divide evenly', () => {
            const result = chunk([1, 2, 3, 4, 5], 2);
            expect(result).toEqual([[1, 2], [3, 4], [5]]);
        });

        test('should handle chunk size of 1', () => {
            const result = chunk([1, 2, 3], 1);
            expect(result).toEqual([[1], [2], [3]]);
        });

        test('should handle chunk size larger than array length', () => {
            const result = chunk([1, 2, 3], 5);
            expect(result).toEqual([[1, 2, 3]]);
        });

        test('should handle chunk size equal to array length', () => {
            const result = chunk([1, 2, 3], 3);
            expect(result).toEqual([[1, 2, 3]]);
        });

        test('should return array of arrays', () => {
            const result = chunk([1, 2, 3, 4], 2);
            expect(Array.isArray(result)).toBe(true);
            result.forEach(chunk => {
                expect(Array.isArray(chunk)).toBe(true);
            });
        });
    });

    describe('documentation example', () => {
        test('should match JSDoc example', () => {
            const result = chunk(["red", "green", "blue", "yellow", "orange"], 2);
            expect(result).toEqual([["red", "green"], ["blue", "yellow"], ["orange"]]);
        });
    });

    describe('array type handling', () => {
        test('should work with string arrays', () => {
            const result = chunk(['apple', 'banana', 'cherry', 'date'], 2);
            expect(result).toEqual([['apple', 'banana'], ['cherry', 'date']]);
        });

        test('should work with number arrays', () => {
            const result = chunk([1, 2, 3, 4, 5, 6, 7], 3);
            expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
        });

        test('should work with object arrays', () => {
            const objects = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
            const result = chunk(objects, 2);
            expect(result).toEqual([[{ id: 1 }, { id: 2 }], [{ id: 3 }, { id: 4 }]]);
        });

        test('should work with mixed type arrays', () => {
            const mixed = [1, 'string', { key: 'value' }, null, true];
            const result = chunk(mixed, 2);
            expect(result).toEqual([[1, 'string'], [{ key: 'value' }, null], [true]]);
        });

        test('should work with boolean arrays', () => {
            const result = chunk([true, false, true, false, true], 2);
            expect(result).toEqual([[true, false], [true, false], [true]]);
        });

        test('should work with arrays containing null and undefined', () => {
            const result = chunk([null, undefined, 'value', null], 2);
            expect(result).toEqual([[null, undefined], ['value', null]]);
        });

        test('should work with nested arrays', () => {
            const nested = [[1, 2], [3, 4], [5, 6], [7, 8]];
            const result = chunk(nested, 2);
            expect(result).toEqual([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]);
        });
    });

    describe('edge cases', () => {
        test('should handle empty arrays', () => {
            const result = chunk([], 2);
            expect(result).toEqual([]);
        });

        test('should handle single-item arrays', () => {
            const result = chunk(['only-item'], 1);
            expect(result).toEqual([['only-item']]);
        });

        test('should handle single-item arrays with larger chunk size', () => {
            const result = chunk(['only-item'], 5);
            expect(result).toEqual([['only-item']]);
        });

        test('should handle arrays with duplicate elements', () => {
            const result = chunk(['a', 'a', 'b', 'b', 'b'], 2);
            expect(result).toEqual([['a', 'a'], ['b', 'b'], ['b']]);
        });

        test('should handle very large chunk sizes', () => {
            const result = chunk([1, 2, 3], 1000);
            expect(result).toEqual([[1, 2, 3]]);
        });

        test('should handle sparse arrays', () => {
            const sparse = new Array(5);
            sparse[0] = 'first';
            sparse[4] = 'last';
            const result = chunk(sparse, 2);
            
            expect(result.length).toBe(3);
            expect(result[0][0]).toBe('first');
            expect(result[0].hasOwnProperty(1)).toBe(false);
            expect(result[1].length).toBe(2);
            expect(result[1].every((_, i) => !result[1].hasOwnProperty(i))).toBe(true);
            expect(result[2]).toEqual(['last']);
        });
    });

    describe('size variations', () => {
        test('should work with chunk size 1', () => {
            const result = chunk([1, 2, 3, 4], 1);
            expect(result).toEqual([[1], [2], [3], [4]]);
        });

        test('should work with chunk size 3', () => {
            const result = chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
            expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        });

        test('should work with chunk size 4', () => {
            const result = chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4);
            expect(result).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10]]);
        });

        test('should work with very large arrays and small chunks', () => {
            const largeArray = Array.from({ length: 100 }, (_, i) => i);
            const result = chunk(largeArray, 10);
            
            expect(result.length).toBe(10);
            expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
            expect(result[9]).toEqual([90, 91, 92, 93, 94, 95, 96, 97, 98, 99]);
        });
    });

    describe('immutability', () => {
        test('should not modify the original array', () => {
            const original = [1, 2, 3, 4, 5];
            const originalCopy = [...original];
            
            chunk(original, 2);
            
            expect(original).toEqual(originalCopy);
        });

        test('should create new sub-arrays', () => {
            const original = [1, 2, 3, 4];
            const result = chunk(original, 2);
            
            // Modifying result should not affect original
            result[0][0] = 999;
            expect(original[0]).toBe(1);
        });

        test('should preserve object references in chunks', () => {
            const obj1 = { id: 1 };
            const obj2 = { id: 2 };
            const original = [obj1, obj2];
            const result = chunk(original, 1);
            
            expect(result[0][0]).toBe(obj1); // same reference
            expect(result[1][0]).toBe(obj2); // same reference
        });
    });

    describe('generic type handling', () => {
        test('should maintain type safety with typed arrays', () => {
            interface TestItem {
                id: number;
                name: string;
            }
            
            const items: TestItem[] = [
                { id: 1, name: 'first' },
                { id: 2, name: 'second' },
                { id: 3, name: 'third' },
                { id: 4, name: 'fourth' }
            ];
            
            const result = chunk(items, 2);
            
            expect(result.length).toBe(2);
            result.forEach(subArray => {
                subArray.forEach(item => {
                    expect(item).toHaveProperty('id');
                    expect(item).toHaveProperty('name');
                    expect(typeof item.id).toBe('number');
                    expect(typeof item.name).toBe('string');
                });
            });
        });

        test('should work with arrays of functions', () => {
            const fn1 = () => 'function1';
            const fn2 = () => 'function2';
            const fn3 = () => 'function3';
            const functions = [fn1, fn2, fn3];
            
            const result = chunk(functions, 2);
            
            expect(result).toEqual([[fn1, fn2], [fn3]]);
            result.forEach(subArray => {
                subArray.forEach(fn => {
                    expect(typeof fn).toBe('function');
                });
            });
        });
    });

    describe('mathematical properties', () => {
        test('should preserve total number of elements', () => {
            const original = [1, 2, 3, 4, 5, 6, 7];
            const result = chunk(original, 3);
            
            const totalElements = result.reduce((sum, subArray) => sum + subArray.length, 0);
            expect(totalElements).toBe(original.length);
        });

        test('should create correct number of chunks', () => {
            const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const chunkSize = 3;
            const result = chunk(original, chunkSize);
            
            const expectedChunks = Math.ceil(original.length / chunkSize);
            expect(result.length).toBe(expectedChunks);
        });

        test('should have all but last chunk of specified size', () => {
            const original = [1, 2, 3, 4, 5, 6, 7];
            const chunkSize = 3;
            const result = chunk(original, chunkSize);
            
            for (let i = 0; i < result.length - 1; i++) {
                expect(result[i].length).toBe(chunkSize);
            }
            
            // Last chunk can be smaller or equal to chunk size
            expect(result[result.length - 1].length).toBeLessThanOrEqual(chunkSize);
            expect(result[result.length - 1].length).toBeGreaterThan(0);
        });
    });

    describe('special array types', () => {
        test('should work with arrays created from strings', () => {
            const charArray = Array.from('hello');
            const result = chunk(charArray, 2);
            expect(result).toEqual([['h', 'e'], ['l', 'l'], ['o']]);
        });

        test('should work with typed arrays converted to regular arrays', () => {
            const typedArray = new Uint8Array([1, 2, 3, 4, 5]);
            const regularArray = Array.from(typedArray);
            const result = chunk(regularArray, 2);
            expect(result).toEqual([[1, 2], [3, 4], [5]]);
        });

        test('should work with array-like objects converted to arrays', () => {
            const arrayLike = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', length: 4 };
            const regularArray = Array.from(arrayLike);
            const result = chunk(regularArray, 3);
            expect(result).toEqual([['a', 'b', 'c'], ['d']]);
        });
    });

    describe('performance characteristics', () => {
        test('should handle large arrays efficiently', () => {
            const largeArray = Array.from({ length: 10000 }, (_, i) => i);
            
            const startTime = Date.now();
            const result = chunk(largeArray, 100);
            const endTime = Date.now();
            
            expect(result.length).toBe(100);
            expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
        });

        test('should not cause stack overflow for very large arrays', () => {
            const veryLargeArray = Array.from({ length: 100000 }, (_, i) => i);
            
            expect(() => chunk(veryLargeArray, 1000)).not.toThrow();
        });
    });

    describe('consistency checks', () => {
        test('should maintain element order within chunks', () => {
            const original = ['a', 'b', 'c', 'd', 'e', 'f'];
            const result = chunk(original, 2);
            
            expect(result[0]).toEqual(['a', 'b']);
            expect(result[1]).toEqual(['c', 'd']);
            expect(result[2]).toEqual(['e', 'f']);
        });

        test('should maintain global element order across chunks', () => {
            const original = [1, 2, 3, 4, 5, 6, 7];
            const result = chunk(original, 3);
            
            const flattened = result.flat();
            expect(flattened).toEqual(original);
        });

        test('should work correctly with consecutive chunking', () => {
            const original = [1, 2, 3, 4, 5, 6, 7, 8];
            
            // First chunk into groups of 4
            const firstChunk = chunk(original, 4);
            expect(firstChunk).toEqual([[1, 2, 3, 4], [5, 6, 7, 8]]);
            
            // Then chunk each group into groups of 2
            const secondChunk = firstChunk.map(subArray => chunk(subArray, 2));
            expect(secondChunk).toEqual([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]);
        });
    });
});
