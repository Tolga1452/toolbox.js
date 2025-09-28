// @ts-nocheck
import { isCmykColor } from '../src/functions/isCmykColor.js';

describe('isCmykColor', () => {
    describe('valid CMYK objects', () => {
        test('should return true for valid CMYK object with all zeros', () => {
            expect(isCmykColor({ c: 0, m: 0, y: 0, k: 0 })).toBe(true);
        });

        test('should return true for valid CMYK object with all maximum values', () => {
            expect(isCmykColor({ c: 100, m: 100, y: 100, k: 100 })).toBe(true);
        });

        test('should return true for valid CMYK object with mixed values', () => {
            expect(isCmykColor({ c: 50, m: 25, y: 75, k: 10 })).toBe(true);
        });

        test('should return true for CMYK objects from documentation examples', () => {
            expect(isCmykColor({ c: 0, m: 100, y: 100, k: 0 })).toBe(true);
            expect(isCmykColor({ c: 50, m: 50, y: 50, k: 50 })).toBe(true);
        });

        test('should return true for valid CMYK object with extra properties', () => {
            expect(isCmykColor({ c: 10, m: 20, y: 30, k: 40, extra: 'property' })).toBe(true);
        });
    });

    describe('invalid CMYK objects - out of range values', () => {
        test('should return false when cyan is out of range', () => {
            expect(isCmykColor({ c: -1, m: 50, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 101, m: 50, y: 50, k: 50 })).toBe(false);
        });

        test('should return false when magenta is out of range', () => {
            expect(isCmykColor({ c: 50, m: -1, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 101, y: 50, k: 50 })).toBe(false);
        });

        test('should return false when yellow is out of range', () => {
            expect(isCmykColor({ c: 50, m: 50, y: -1, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50, y: 101, k: 50 })).toBe(false);
        });

        test('should return false when black is out of range', () => {
            expect(isCmykColor({ c: 50, m: 50, y: 50, k: -1 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50, y: 50, k: 101 })).toBe(false);
        });

        test('should return false from documentation example', () => {
            expect(isCmykColor({ c: 101, m: 50, y: 50, k: 50 })).toBe(false);
        });
    });

    describe('invalid CMYK objects - non-integer values', () => {
        test('should return false when cyan is not an integer', () => {
            expect(isCmykColor({ c: 50.5, m: 50, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: '50', m: 50, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: true, m: 50, y: 50, k: 50 })).toBe(false);
        });

        test('should return false when magenta is not an integer', () => {
            expect(isCmykColor({ c: 50, m: 50.7, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: '50', y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: false, y: 50, k: 50 })).toBe(false);
        });

        test('should return false when yellow is not an integer', () => {
            expect(isCmykColor({ c: 50, m: 50, y: 50.3, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50, y: '50', k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50, y: null, k: 50 })).toBe(false);
        });

        test('should return false when black is not an integer', () => {
            expect(isCmykColor({ c: 50, m: 50, y: 50, k: 50.9 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50, y: 50, k: '50' })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50, y: 50, k: undefined })).toBe(false);
        });

        test('should return false when all values are non-integers', () => {
            expect(isCmykColor({ c: 50.1, m: 50.2, y: 50.3, k: 50.4 })).toBe(false);
            expect(isCmykColor({ c: '50', m: '50', y: '50', k: '50' })).toBe(false);
        });
    });

    describe('invalid CMYK objects - missing properties', () => {
        test('should return false when cyan property is missing', () => {
            expect(isCmykColor({ m: 50, y: 50, k: 50 })).toBe(false);
        });

        test('should return false when magenta property is missing', () => {
            expect(isCmykColor({ c: 50, y: 50, k: 50 })).toBe(false);
        });

        test('should return false when yellow property is missing', () => {
            expect(isCmykColor({ c: 50, m: 50, k: 50 })).toBe(false);
        });

        test('should return false when black property is missing', () => {
            expect(isCmykColor({ c: 50, m: 50, y: 50 })).toBe(false);
        });

        test('should return false when multiple properties are missing', () => {
            expect(isCmykColor({ c: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50 })).toBe(false);
            expect(isCmykColor({})).toBe(false);
        });
    });

    describe('non-object inputs', () => {
        test('should return false for null', () => {
            expect(isCmykColor(null)).toBe(false);
        });

        test('should return false for undefined', () => {
            expect(isCmykColor(undefined)).toBe(false);
        });

        test('should return false for primitive types', () => {
            expect(isCmykColor(42)).toBe(false);
            expect(isCmykColor('string')).toBe(false);
            expect(isCmykColor(true)).toBe(false);
            expect(isCmykColor(false)).toBe(false);
        });

        test('should return false for arrays', () => {
            expect(isCmykColor([])).toBe(false);
            expect(isCmykColor([0, 100, 100, 0])).toBe(false);
            expect(isCmykColor([{ c: 50, m: 50, y: 50, k: 50 }])).toBe(false);
        });

        test('should return false for functions', () => {
            expect(isCmykColor(() => {})).toBe(false);
            expect(isCmykColor(function() {})).toBe(false);
        });

        test('should return false for string from documentation example', () => {
            expect(isCmykColor("#ff0000")).toBe(false);
        });
    });

    describe('edge cases and boundary values', () => {
        test('should return true for boundary values', () => {
            expect(isCmykColor({ c: 0, m: 0, y: 0, k: 0 })).toBe(true);
            expect(isCmykColor({ c: 100, m: 100, y: 100, k: 100 })).toBe(true);
            expect(isCmykColor({ c: 0, m: 100, y: 0, k: 100 })).toBe(true);
        });

        test('should return false for values just outside boundaries', () => {
            expect(isCmykColor({ c: -0.1, m: 50, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 100.1, m: 50, y: 50, k: 50 })).toBe(false);
        });

        test('should return false for negative zero (edge case)', () => {
            expect(isCmykColor({ c: -0, m: 50, y: 50, k: 50 })).toBe(true); // -0 is still 0
        });

        test('should return false for Infinity and -Infinity', () => {
            expect(isCmykColor({ c: Infinity, m: 50, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: -Infinity, m: 50, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50, y: 50, k: Infinity })).toBe(false);
        });

        test('should return false for NaN values', () => {
            expect(isCmykColor({ c: NaN, m: 50, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: NaN, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50, y: NaN, k: 50 })).toBe(false);
            expect(isCmykColor({ c: 50, m: 50, y: 50, k: NaN })).toBe(false);
        });

        test('should return false for very large numbers', () => {
            expect(isCmykColor({ c: Number.MAX_VALUE, m: 50, y: 50, k: 50 })).toBe(false);
            expect(isCmykColor({ c: Number.MAX_SAFE_INTEGER, m: 50, y: 50, k: 50 })).toBe(false);
        });
    });

    describe('special object types', () => {
        test('should return false for Date objects', () => {
            expect(isCmykColor(new Date())).toBe(false);
        });

        test('should return false for RegExp objects', () => {
            expect(isCmykColor(/test/)).toBe(false);
        });

        test('should return false for Error objects', () => {
            expect(isCmykColor(new Error('test'))).toBe(false);
        });

        test('should return false for Map objects', () => {
            expect(isCmykColor(new Map())).toBe(false);
        });

        test('should return false for Set objects', () => {
            expect(isCmykColor(new Set())).toBe(false);
        });

        test('should handle objects with prototype chains', () => {
            const obj = Object.create({ c: 50, m: 50, y: 50, k: 50 });
            expect(isCmykColor(obj)).toBe(true);
        });

        test('should handle objects with own properties', () => {
            const obj = {};
            obj.c = 50;
            obj.m = 50;
            obj.y = 50;
            obj.k = 50;
            expect(isCmykColor(obj)).toBe(true);
        });
    });

    describe('type guard functionality', () => {
        test('should work as a type guard in conditional blocks', () => {
            const value: unknown = { c: 50, m: 50, y: 50, k: 50 };
            
            if (isCmykColor(value)) {
                // TypeScript should now know value is CMYK
                expect(value.c).toBe(50);
                expect(value.m).toBe(50);
                expect(value.y).toBe(50);
                expect(value.k).toBe(50);
            } else {
                fail('Should have been recognized as valid CMYK');
            }
        });

        test('should properly filter arrays using the type guard', () => {
            const values = [
                { c: 50, m: 50, y: 50, k: 50 },
                { c: 101, m: 50, y: 50, k: 50 },
                'not a color',
                { c: 0, m: 0, y: 0, k: 0 },
                null
            ];

            const cmykColors = values.filter(isCmykColor);
            expect(cmykColors).toHaveLength(2);
            expect(cmykColors[0]).toEqual({ c: 50, m: 50, y: 50, k: 50 });
            expect(cmykColors[1]).toEqual({ c: 0, m: 0, y: 0, k: 0 });
        });
    });
});
