import { randomItem } from '../src/functions';

describe('randomItem', () => {
    describe('type validation', () => {
        test('should throw TypeError for non-array input', () => {
            expect(() => randomItem('not an array' as any)).toThrow(TypeError);
            expect(() => randomItem(123 as any)).toThrow(TypeError);
            expect(() => randomItem(null as any)).toThrow(TypeError);
            expect(() => randomItem(undefined as any)).toThrow(TypeError);
            expect(() => randomItem({} as any)).toThrow(TypeError);
        });

        test('should throw TypeError with correct message', () => {
            expect(() => randomItem('not an array' as any)).toThrow('`arr` must be an array');
        });
    });

    describe('basic functionality', () => {
        test('should return an item from the array', () => {
            const arr = ['red', 'green', 'blue'];
            const result = randomItem(arr);
            
            expect(arr).toContain(result);
        });

        test('should return the only item from single-item array', () => {
            const arr = ['only-item'];
            const result = randomItem(arr);
            
            expect(result).toBe('only-item');
        });

        test('should consistently return the same item for single-item array', () => {
            const arr = [42];
            
            for (let i = 0; i < 10; i++) {
                expect(randomItem(arr)).toBe(42);
            }
        });
    });

    describe('array type handling', () => {
        test('should work with string arrays', () => {
            const arr = ['apple', 'banana', 'cherry'];
            const result = randomItem(arr);
            
            expect(typeof result).toBe('string');
            expect(arr).toContain(result);
        });

        test('should work with number arrays', () => {
            const arr = [1, 2, 3, 4, 5];
            const result = randomItem(arr);
            
            expect(typeof result).toBe('number');
            expect(arr).toContain(result);
        });

        test('should work with object arrays', () => {
            const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
            const result = randomItem(arr);
            
            expect(typeof result).toBe('object');
            expect(arr).toContain(result);
            expect(result).toHaveProperty('id');
        });

        test('should work with mixed type arrays', () => {
            const arr = [1, 'string', { key: 'value' }, null, true];
            const result = randomItem(arr);
            
            expect(arr).toContain(result);
        });

        test('should work with boolean arrays', () => {
            const arr = [true, false];
            const result = randomItem(arr);
            
            expect(typeof result).toBe('boolean');
            expect(arr).toContain(result);
        });

        test('should work with arrays containing null and undefined', () => {
            const arr = [null, undefined, 'value'];
            const result = randomItem(arr);
            
            expect(arr).toContain(result);
        });

        test('should work with nested arrays', () => {
            const arr = [[1, 2], [3, 4], [5, 6]];
            const result = randomItem(arr);
            
            expect(Array.isArray(result)).toBe(true);
            expect(arr).toContain(result);
        });
    });

    describe('edge cases', () => {
        test('should handle empty arrays', () => {
            const arr: any[] = [];
            
            // This will likely cause an error since randomInt(0, -1) is invalid
            expect(() => randomItem(arr)).toThrow();
        });

        test('should work with very large arrays', () => {
            const arr = Array.from({ length: 10000 }, (_, i) => i);
            const result = randomItem(arr);
            
            expect(typeof result).toBe('number');
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(10000);
            expect(arr).toContain(result);
        });

        test('should work with array-like objects that are arrays', () => {
            const arr = Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']
            const result = randomItem(arr);
            
            expect(typeof result).toBe('string');
            expect(arr).toContain(result);
        });
    });

    describe('randomness distribution', () => {
        test('should be able to return all items from array over multiple calls', () => {
            const arr = ['a', 'b', 'c'];
            const results = new Set();
            
            // Run enough times to have high probability of hitting all items
            for (let i = 0; i < 100; i++) {
                results.add(randomItem(arr));
            }
            
            expect(results.has('a')).toBe(true);
            expect(results.has('b')).toBe(true);
            expect(results.has('c')).toBe(true);
        });

        test('should generate different values over multiple calls for larger arrays', () => {
            const arr = Array.from({ length: 10 }, (_, i) => i);
            const results = new Set();
            
            for (let i = 0; i < 50; i++) {
                results.add(randomItem(arr));
            }
            
            // Should get multiple different values
            expect(results.size).toBeGreaterThan(3);
        });

        test('should not favor any particular item in small array', () => {
            const arr = [1, 2];
            let count1 = 0;
            let count2 = 0;
            
            for (let i = 0; i < 1000; i++) {
                const result = randomItem(arr);
                if (result === 1) count1++;
                if (result === 2) count2++;
            }
            
            // Both values should appear
            expect(count1).toBeGreaterThan(0);
            expect(count2).toBeGreaterThan(0);
            expect(count1 + count2).toBe(1000);
        });
    });

    describe('generic type handling', () => {
        test('should maintain type safety with typed arrays', () => {
            interface TestItem {
                name: string;
                value: number;
            }
            
            const arr: TestItem[] = [
                { name: 'first', value: 1 },
                { name: 'second', value: 2 },
                { name: 'third', value: 3 }
            ];
            
            const result = randomItem(arr);
            
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('value');
            expect(typeof result.name).toBe('string');
            expect(typeof result.value).toBe('number');
            expect(arr).toContain(result);
        });

        test('should work with arrays of functions', () => {
            const arr = [
                () => 'function1',
                () => 'function2',
                () => 'function3'
            ];
            
            const result = randomItem(arr);
            
            expect(typeof result).toBe('function');
            expect(arr).toContain(result);
            expect(typeof result()).toBe('string');
        });
    });

    describe('special array contents', () => {
        test('should work with arrays containing duplicate items', () => {
            const arr = ['duplicate', 'duplicate', 'unique'];
            const result = randomItem(arr);
            
            expect(arr).toContain(result);
            expect(['duplicate', 'unique']).toContain(result);
        });

        test('should work with arrays containing complex objects', () => {
            const arr = [
                { nested: { deep: { value: 1 } } },
                { nested: { deep: { value: 2 } } }
            ];
            
            const result = randomItem(arr);
            
            expect(result).toHaveProperty('nested');
            expect(result.nested).toHaveProperty('deep');
            expect(result.nested.deep).toHaveProperty('value');
            expect(arr).toContain(result);
        });

        test('should work with sparse arrays', () => {
            const arr = new Array(5);
            arr[0] = 'first';
            arr[4] = 'last';
            
            const result = randomItem(arr);
            
            expect(arr).toContain(result);
        });
    });

    describe('dependency integration', () => {
        test('should properly use randomInt for index selection', () => {
            const arr = ['a', 'b', 'c', 'd', 'e'];
            
            // Test that it works multiple times (indirect test of randomInt usage)
            for (let i = 0; i < 20; i++) {
                const result = randomItem(arr);
                expect(arr).toContain(result);
            }
        });

        test('should handle arrays where randomInt returns boundary values', () => {
            const arr = ['first', 'last'];
            const results = new Set();
            
            // Should be able to get both first (index 0) and last (index 1)
            for (let i = 0; i < 100; i++) {
                results.add(randomItem(arr));
            }
            
            expect(results.has('first')).toBe(true);
            expect(results.has('last')).toBe(true);
        });
    });
});
