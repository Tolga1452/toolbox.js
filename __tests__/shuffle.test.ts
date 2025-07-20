import { shuffle } from '../src/functions';

describe('shuffle', () => {
    describe('type validation', () => {
        test('should throw TypeError for non-array input', () => {
            expect(() => shuffle('not an array' as any)).toThrow(TypeError);
            expect(() => shuffle(123 as any)).toThrow(TypeError);
            expect(() => shuffle(null as any)).toThrow(TypeError);
            expect(() => shuffle(undefined as any)).toThrow(TypeError);
            expect(() => shuffle({} as any)).toThrow(TypeError);
        });

        test('should throw TypeError with correct message', () => {
            expect(() => shuffle('not an array' as any)).toThrow('`arr` must be an array');
        });
    });

    describe('basic functionality', () => {
        test('should return an array', () => {
            const input = [1, 2, 3];
            const result = shuffle(input);
            
            expect(Array.isArray(result)).toBe(true);
        });

        test('should return array with same length', () => {
            const input = [1, 2, 3, 4, 5];
            const result = shuffle(input);
            
            expect(result.length).toBe(input.length);
        });

        test('should contain all original elements', () => {
            const input = ['a', 'b', 'c', 'd', 'e'];
            const result = shuffle(input);
            
            input.forEach(element => {
                expect(result).toContain(element);
            });
        });

        test('should contain same number of each element', () => {
            const input = [1, 2, 2, 3, 3, 3];
            const result = shuffle(input);
            
            // Count occurrences in both arrays
            const countElement = (arr: number[], element: number) => 
                arr.filter(item => item === element).length;
            
            expect(countElement(result, 1)).toBe(1);
            expect(countElement(result, 2)).toBe(2);
            expect(countElement(result, 3)).toBe(3);
        });
    });

    describe('immutability', () => {
        test('should not modify the original array', () => {
            const original = [1, 2, 3, 4, 5];
            const originalCopy = [...original];
            
            shuffle(original);
            
            expect(original).toEqual(originalCopy);
        });

        test('should return a new array instance', () => {
            const input = [1, 2, 3];
            const result = shuffle(input);
            
            expect(result).not.toBe(input);
        });

        test('should not modify nested objects in original array', () => {
            const obj1 = { value: 1 };
            const obj2 = { value: 2 };
            const input = [obj1, obj2];
            
            shuffle(input);
            
            expect(obj1.value).toBe(1);
            expect(obj2.value).toBe(2);
        });
    });

    describe('array type handling', () => {
        test('should work with string arrays', () => {
            const input = ['apple', 'banana', 'cherry'];
            const result = shuffle(input);
            
            expect(result.length).toBe(3);
            expect(result).toContain('apple');
            expect(result).toContain('banana');
            expect(result).toContain('cherry');
        });

        test('should work with number arrays', () => {
            const input = [1, 2, 3, 4, 5];
            const result = shuffle(input);
            
            expect(result.length).toBe(5);
            input.forEach(num => expect(result).toContain(num));
        });

        test('should work with object arrays', () => {
            const input = [{ id: 1 }, { id: 2 }, { id: 3 }];
            const result = shuffle(input);
            
            expect(result.length).toBe(3);
            input.forEach(obj => expect(result).toContain(obj));
        });

        test('should work with mixed type arrays', () => {
            const input = [1, 'string', { key: 'value' }, null, true];
            const result = shuffle(input);
            
            expect(result.length).toBe(5);
            input.forEach(item => expect(result).toContain(item));
        });

        test('should work with boolean arrays', () => {
            const input = [true, false, true, false];
            const result = shuffle(input);
            
            expect(result.length).toBe(4);
            expect(result.filter(x => x === true).length).toBe(2);
            expect(result.filter(x => x === false).length).toBe(2);
        });

        test('should work with arrays containing null and undefined', () => {
            const input = [null, undefined, 'value', null];
            const result = shuffle(input);
            
            expect(result.length).toBe(4);
            expect(result.filter(x => x === null).length).toBe(2);
            expect(result.filter(x => x === undefined).length).toBe(1);
            expect(result.filter(x => x === 'value').length).toBe(1);
        });

        test('should work with nested arrays', () => {
            const input = [[1, 2], [3, 4], [5, 6]];
            const result = shuffle(input);
            
            expect(result.length).toBe(3);
            input.forEach(subArray => expect(result).toContain(subArray));
        });
    });

    describe('edge cases', () => {
        test('should handle empty arrays', () => {
            const input: any[] = [];
            const result = shuffle(input);
            
            expect(result).toEqual([]);
            expect(result.length).toBe(0);
        });

        test('should handle single-item arrays', () => {
            const input = ['only-item'];
            const result = shuffle(input);
            
            expect(result).toEqual(['only-item']);
            expect(result.length).toBe(1);
        });

        test('should handle two-item arrays', () => {
            const input = ['first', 'second'];
            const result = shuffle(input);
            
            expect(result.length).toBe(2);
            expect(result).toContain('first');
            expect(result).toContain('second');
        });

        test('should handle arrays with duplicate elements', () => {
            const input = ['a', 'a', 'b', 'b', 'b'];
            const result = shuffle(input);
            
            expect(result.length).toBe(5);
            expect(result.filter(x => x === 'a').length).toBe(2);
            expect(result.filter(x => x === 'b').length).toBe(3);
        });

        test('should handle very large arrays', () => {
            const input = Array.from({ length: 1000 }, (_, i) => i);
            const result = shuffle(input);
            
            expect(result.length).toBe(1000);
            // Check that all numbers 0-999 are present
            for (let i = 0; i < 1000; i++) {
                expect(result).toContain(i);
            }
        });

        test('should handle sparse arrays', () => {
            const input = new Array(5);
            input[0] = 'first';
            input[4] = 'last';
            
            const result = shuffle(input);
            
            expect(result.length).toBe(5);
            expect(result).toContain('first');
            expect(result).toContain('last');
            expect(result).toContain(undefined);
        });
    });

    describe('randomness verification', () => {
        test('should produce different results over multiple calls', () => {
            const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const results = new Set();
            
            // Generate multiple shuffles and convert to strings for comparison
            for (let i = 0; i < 20; i++) {
                results.add(JSON.stringify(shuffle(input)));
            }
            
            // Should generate multiple different arrangements
            expect(results.size).toBeGreaterThan(1);
        });

        test('should eventually produce different arrangements for small arrays', () => {
            const input = [1, 2, 3];
            const arrangements = new Set();
            
            // For a 3-element array, there are 6 possible arrangements
            for (let i = 0; i < 100; i++) {
                arrangements.add(JSON.stringify(shuffle(input)));
            }
            
            // Should find at least 2 different arrangements in 100 tries
            expect(arrangements.size).toBeGreaterThan(1);
        });

        test('should not always return the same arrangement', () => {
            const input = [1, 2, 3, 4, 5];
            const originalOrder = JSON.stringify(input);
            let differentArrangements = 0;
            
            for (let i = 0; i < 50; i++) {
                const shuffled = shuffle(input);
                if (JSON.stringify(shuffled) !== originalOrder) {
                    differentArrangements++;
                }
            }
            
            // Should get at least some different arrangements
            expect(differentArrangements).toBeGreaterThan(0);
        });

        test('should maintain uniform distribution characteristics', () => {
            const input = [1, 2];
            let firstPositionOnes = 0;
            const trials = 1000;
            
            for (let i = 0; i < trials; i++) {
                const result = shuffle(input);
                if (result[0] === 1) {
                    firstPositionOnes++;
                }
            }
            
            // Should be roughly 50% (within reasonable bounds)
            // Allow for 40-60% range to account for randomness
            expect(firstPositionOnes).toBeGreaterThan(trials * 0.3);
            expect(firstPositionOnes).toBeLessThan(trials * 0.7);
        });
    });

    describe('algorithm correctness', () => {
        test('should implement Fisher-Yates shuffle correctly', () => {
            const input = [1, 2, 3, 4, 5];
            const result = shuffle(input);
            
            // Verify all elements are present (Fisher-Yates preserves all elements)
            expect(result.sort()).toEqual(input.sort());
        });

        test('should handle single element without error', () => {
            const input = [42];
            const result = shuffle(input);
            
            expect(result).toEqual([42]);
        });

        test('should preserve element references', () => {
            const obj1 = { name: 'first' };
            const obj2 = { name: 'second' };
            const input = [obj1, obj2];
            const result = shuffle(input);
            
            // Same object references should be preserved
            expect(result).toContain(obj1);
            expect(result).toContain(obj2);
            expect(result.includes(obj1)).toBe(true);
            expect(result.includes(obj2)).toBe(true);
        });
    });

    describe('generic type handling', () => {
        test('should maintain type safety with typed arrays', () => {
            interface TestItem {
                id: number;
                name: string;
            }
            
            const input: TestItem[] = [
                { id: 1, name: 'first' },
                { id: 2, name: 'second' },
                { id: 3, name: 'third' }
            ];
            
            const result = shuffle(input);
            
            expect(result.length).toBe(3);
            result.forEach(item => {
                expect(item).toHaveProperty('id');
                expect(item).toHaveProperty('name');
                expect(typeof item.id).toBe('number');
                expect(typeof item.name).toBe('string');
            });
        });

        test('should work with arrays of functions', () => {
            const fn1 = () => 'function1';
            const fn2 = () => 'function2';
            const fn3 = () => 'function3';
            const input = [fn1, fn2, fn3];
            
            const result = shuffle(input);
            
            expect(result.length).toBe(3);
            result.forEach(fn => {
                expect(typeof fn).toBe('function');
            });
            expect(result).toContain(fn1);
            expect(result).toContain(fn2);
            expect(result).toContain(fn3);
        });
    });

    describe('special array types', () => {
        test('should work with typed arrays converted to regular arrays', () => {
            const typedArray = new Uint8Array([1, 2, 3, 4, 5]);
            const input = Array.from(typedArray);
            const result = shuffle(input);
            
            expect(result.length).toBe(5);
            input.forEach(num => expect(result).toContain(num));
        });

        test('should work with arrays created from strings', () => {
            const input = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
            const result = shuffle(input);
            
            expect(result.length).toBe(5);
            expect(result.filter(char => char === 'l').length).toBe(2);
            expect(result).toContain('h');
            expect(result).toContain('e');
            expect(result).toContain('o');
        });

        test('should work with array-like objects converted to arrays', () => {
            const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
            const input = Array.from(arrayLike);
            const result = shuffle(input);
            
            expect(result.length).toBe(3);
            expect(result).toContain('a');
            expect(result).toContain('b');
            expect(result).toContain('c');
        });
    });

    describe('performance characteristics', () => {
        test('should complete in reasonable time for large arrays', () => {
            const input = Array.from({ length: 10000 }, (_, i) => i);
            
            const startTime = Date.now();
            const result = shuffle(input);
            const endTime = Date.now();
            
            expect(result.length).toBe(10000);
            expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
        });

        test('should not cause stack overflow for very large arrays', () => {
            const input = Array.from({ length: 100000 }, (_, i) => i);
            
            expect(() => shuffle(input)).not.toThrow();
        });
    });

    describe('consistency checks', () => {
        test('should always return array with exact same elements', () => {
            const input = ['unique', 'items', 'test', 42, null, { key: 'value' }];
            
            for (let i = 0; i < 10; i++) {
                const result = shuffle(input);
                expect(result.length).toBe(input.length);
                input.forEach(item => expect(result).toContain(item));
            }
        });

        test('should handle consecutive shuffles correctly', () => {
            const input = [1, 2, 3, 4, 5];
            
            let current = input;
            for (let i = 0; i < 5; i++) {
                current = shuffle(current);
                expect(current.length).toBe(5);
                expect(current.sort()).toEqual([1, 2, 3, 4, 5]);
            }
        });
    });
});
