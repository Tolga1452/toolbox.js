import { check } from '../src/functions';

describe('check', () => {
    describe('basic boolean functionality', () => {
        test('should return ifTrue when value is true', () => {
            expect(check(true, 'Hello', 'World')).toBe('Hello');
        });

        test('should return ifFalse when value is false', () => {
            expect(check(false, 'Hello', 'World')).toBe('World');
        });

        test('should work with boolean literals', () => {
            expect(check(Boolean(true), 'yes', 'no')).toBe('yes');
            expect(check(Boolean(false), 'yes', 'no')).toBe('no');
        });
    });

    describe('truthy values', () => {
        test('should return ifTrue for non-empty strings', () => {
            expect(check('text', 'Hello', 'World')).toBe('Hello');
            expect(check('hello', 'yes', 'no')).toBe('yes');
            expect(check(' ', 'space', 'empty')).toBe('space'); // space is truthy
        });

        test('should return ifTrue for positive numbers', () => {
            expect(check(1, 'positive', 'zero')).toBe('positive');
            expect(check(42, 'number', 'zero')).toBe('number');
            expect(check(3.14, 'pi', 'zero')).toBe('pi');
        });

        test('should return ifTrue for negative numbers', () => {
            expect(check(-1, 'negative', 'zero')).toBe('negative');
            expect(check(-42, 'number', 'zero')).toBe('number');
        });

        test('should return ifTrue for objects', () => {
            expect(check({}, 'object', 'falsy')).toBe('object');
            expect(check({ key: 'value' }, 'object', 'falsy')).toBe('object');
            expect(check(new Date(), 'date', 'falsy')).toBe('date');
        });

        test('should return ifTrue for arrays', () => {
            expect(check([], 'array', 'falsy')).toBe('array');
            expect(check([1, 2, 3], 'array', 'falsy')).toBe('array');
        });

        test('should return ifTrue for functions', () => {
            expect(check(() => {}, 'function', 'falsy')).toBe('function');
            expect(check(function() {}, 'function', 'falsy')).toBe('function');
        });

        test('should return ifTrue for Infinity', () => {
            expect(check(Infinity, 'infinity', 'falsy')).toBe('infinity');
            expect(check(-Infinity, 'negative-infinity', 'falsy')).toBe('negative-infinity');
        });
    });

    describe('falsy values', () => {
        test('should return ifFalse for empty string', () => {
            expect(check('', 'Hello', 'World')).toBe('World');
        });

        test('should return ifFalse for zero', () => {
            expect(check(0, 'truthy', 'zero')).toBe('zero');
            expect(check(-0, 'truthy', 'zero')).toBe('zero');
        });

        test('should return ifFalse for null', () => {
            expect(check(null, 'truthy', 'null')).toBe('null');
        });

        test('should return ifFalse for undefined', () => {
            expect(check(undefined, 'truthy', 'undefined')).toBe('undefined');
        });

        test('should return ifFalse for NaN', () => {
            expect(check(NaN, 'truthy', 'nan')).toBe('nan');
        });

        test('should return ifFalse for false', () => {
            expect(check(false, 'truthy', 'false')).toBe('false');
        });
    });

    describe('return value types', () => {
        test('should return exact values without modification', () => {
            const obj1 = { a: 1 };
            const obj2 = { b: 2 };
            expect(check(true, obj1, obj2)).toBe(obj1);
            expect(check(false, obj1, obj2)).toBe(obj2);
        });

        test('should work with different types for ifTrue and ifFalse', () => {
            expect(check(true, 42, 'string')).toBe(42);
            expect(check(false, 42, 'string')).toBe('string');
        });

        test('should work with null/undefined as return values', () => {
            expect(check(true, null, 'fallback')).toBe(null);
            expect(check(false, 'value', undefined)).toBe(undefined);
        });

        test('should work with functions as return values', () => {
            const fn1 = () => 'first';
            const fn2 = () => 'second';
            expect(check(true, fn1, fn2)).toBe(fn1);
            expect(check(false, fn1, fn2)).toBe(fn2);
        });

        test('should work with arrays as return values', () => {
            const arr1 = [1, 2, 3];
            const arr2 = [4, 5, 6];
            expect(check(true, arr1, arr2)).toBe(arr1);
            expect(check(false, arr1, arr2)).toBe(arr2);
        });
    });

    describe('documentation examples', () => {
        test('should match all JSDoc examples', () => {
            expect(check(true, "Hello", "World")).toBe("Hello");
            expect(check(false, "Hello", "World")).toBe("World");
            expect(check("text", "Hello", "World")).toBe("Hello");
            expect(check("", "Hello", "World")).toBe("World");
        });
    });

    describe('edge cases', () => {
        test('should handle same values for ifTrue and ifFalse', () => {
            expect(check(true, 'same', 'same')).toBe('same');
            expect(check(false, 'same', 'same')).toBe('same');
        });

        test('should handle complex nested objects', () => {
            const complex1 = { nested: { deep: { value: 1 } } };
            const complex2 = { nested: { deep: { value: 2 } } };
            expect(check(true, complex1, complex2)).toBe(complex1);
            expect(check(false, complex1, complex2)).toBe(complex2);
        });

        test('should handle symbols', () => {
            const sym1 = Symbol('true');
            const sym2 = Symbol('false');
            expect(check(true, sym1, sym2)).toBe(sym1);
            expect(check(false, sym1, sym2)).toBe(sym2);
        });

        test('should handle BigInt values', () => {
            const big1 = BigInt(123);
            const big2 = BigInt(456);
            expect(check(true, big1, big2)).toBe(big1);
            expect(check(false, big1, big2)).toBe(big2);
        });

        test('should handle primitive wrapper objects', () => {
            expect(check(new Boolean(false), 'truthy', 'falsy')).toBe('truthy'); // Boolean object is truthy
            expect(check(new String(''), 'truthy', 'falsy')).toBe('truthy'); // String object is truthy
            expect(check(new Number(0), 'truthy', 'falsy')).toBe('truthy'); // Number object is truthy
        });

        test('should handle class instances', () => {
            class TestClass {
                value: string;
                constructor(value: string) {
                    this.value = value;
                }
            }
            const instance = new TestClass('test');
            expect(check(instance, 'has-instance', 'no-instance')).toBe('has-instance');
        });
    });

    describe('real-world usage patterns', () => {
        test('should work for default value assignment', () => {
            const getValue = (input: any) => check(input, input, 'default');
            
            expect(getValue('provided')).toBe('provided');
            expect(getValue('')).toBe('default');
            expect(getValue(null)).toBe('default');
            expect(getValue(undefined)).toBe('default');
        });

        test('should work for conditional messages', () => {
            const getStatusMessage = (isOnline: any) => 
                check(isOnline, 'User is online', 'User is offline');
            
            expect(getStatusMessage(true)).toBe('User is online');
            expect(getStatusMessage(false)).toBe('User is offline');
            expect(getStatusMessage(1)).toBe('User is online');
            expect(getStatusMessage(0)).toBe('User is offline');
        });

        test('should work for feature flags', () => {
            const getFeature = (enabled: any) => 
                check(enabled, { feature: 'enabled' }, { feature: 'disabled' });
            
            expect(getFeature(true)).toEqual({ feature: 'enabled' });
            expect(getFeature(false)).toEqual({ feature: 'disabled' });
            expect(getFeature('yes')).toEqual({ feature: 'enabled' });
            expect(getFeature('')).toEqual({ feature: 'disabled' });
        });

        test('should work for configuration selection', () => {
            const config = {
                dev: { debug: true, apiUrl: 'dev.api.com' },
                prod: { debug: false, apiUrl: 'api.com' }
            };
            
            const getConfig = (isDev: any) => check(isDev, config.dev, config.prod);
            
            expect(getConfig(true)).toBe(config.dev);
            expect(getConfig(false)).toBe(config.prod);
            expect(getConfig('development')).toBe(config.dev);
            expect(getConfig('')).toBe(config.prod);
        });
    });

    describe('type coercion behavior', () => {
        test('should follow JavaScript truthiness rules', () => {
            // Test that it behaves exactly like the ternary operator
            const testCases = [
                { value: '', expected: false },
                { value: 'hello', expected: true },
                { value: 0, expected: false },
                { value: 1, expected: true },
                { value: -1, expected: true },
                { value: null, expected: false },
                { value: undefined, expected: false },
                { value: [], expected: true },
                { value: {}, expected: true },
                { value: NaN, expected: false },
                { value: Infinity, expected: true }
            ];

            testCases.forEach(({ value, expected }) => {
                const checkResult = check(value, 'truthy', 'falsy');
                const ternaryResult = value ? 'truthy' : 'falsy';
                const expectedResult = expected ? 'truthy' : 'falsy';
                
                expect(checkResult).toBe(ternaryResult);
                expect(checkResult).toBe(expectedResult);
            });
        });

        test('should be equivalent to ternary operator', () => {
            const testValues = [true, false, 1, 0, 'text', '', null, undefined, [], {}, NaN];
            const ifTrue = 'TRUTHY';
            const ifFalse = 'FALSY';

            testValues.forEach(value => {
                expect(check(value, ifTrue, ifFalse)).toBe(value ? ifTrue : ifFalse);
            });
        });
    });

    describe('performance characteristics', () => {
        test('should not modify input parameters', () => {
            const originalValue = { prop: 'original' };
            const originalIfTrue = { prop: 'true' };
            const originalIfFalse = { prop: 'false' };

            check(originalValue, originalIfTrue, originalIfFalse);

            expect(originalValue).toEqual({ prop: 'original' });
            expect(originalIfTrue).toEqual({ prop: 'true' });
            expect(originalIfFalse).toEqual({ prop: 'false' });
        });

        test('should return references, not copies', () => {
            const objTrue = { ref: 'true' };
            const objFalse = { ref: 'false' };

            const result1 = check(true, objTrue, objFalse);
            const result2 = check(false, objTrue, objFalse);

            expect(result1).toBe(objTrue); // same reference
            expect(result2).toBe(objFalse); // same reference
        });
    });
});
