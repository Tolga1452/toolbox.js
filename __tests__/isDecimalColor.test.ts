import { isDecimalColor } from '../src/functions/isDecimalColor';

describe('isDecimalColor', () => {
    describe('valid decimal colors', () => {
        test('should return true for minimum valid value (0)', () => {
            expect(isDecimalColor(0)).toBe(true);
        });

        test('should return true for maximum valid value (0xFFFFFFFF)', () => {
            expect(isDecimalColor(0xFFFFFFFF)).toBe(true);
        });

        test('should return true for common color values', () => {
            expect(isDecimalColor(16777215)).toBe(true); // 0xFFFFFF (white)
            expect(isDecimalColor(0xFF0000)).toBe(true); // red
            expect(isDecimalColor(0x00FF00)).toBe(true); // green
            expect(isDecimalColor(0x0000FF)).toBe(true); // blue
            expect(isDecimalColor(0x000000)).toBe(true); // black
        });

        test('should return true for mid-range values', () => {
            expect(isDecimalColor(12345678)).toBe(true);
            expect(isDecimalColor(2147483647)).toBe(true); // 2^31 - 1
            expect(isDecimalColor(4294967295)).toBe(true); // 2^32 - 1 (0xFFFFFFFF)
        });

        test('should return true for hexadecimal number literals', () => {
            expect(isDecimalColor(0x123456)).toBe(true);
            expect(isDecimalColor(0xABCDEF)).toBe(true);
            expect(isDecimalColor(0x999999)).toBe(true);
        });
    });

    describe('invalid decimal colors - out of range', () => {
        test('should return false for negative numbers', () => {
            expect(isDecimalColor(-1)).toBe(false);
            expect(isDecimalColor(-100)).toBe(false);
            expect(isDecimalColor(-0xFFFFFF)).toBe(false);
        });

        test('should return false for values above maximum', () => {
            expect(isDecimalColor(0xFFFFFFFF + 1)).toBe(false);
            expect(isDecimalColor(4294967296)).toBe(false); // 2^32
            expect(isDecimalColor(Number.MAX_SAFE_INTEGER)).toBe(false);
        });
    });

    describe('invalid decimal colors - non-integers', () => {
        test('should return false for floating point numbers', () => {
            expect(isDecimalColor(1.5)).toBe(false);
            expect(isDecimalColor(0.1)).toBe(false);
            expect(isDecimalColor(16777215.1)).toBe(false);
            expect(isDecimalColor(123.456)).toBe(false);
        });

        test('should return false for special number values', () => {
            expect(isDecimalColor(NaN)).toBe(false);
            expect(isDecimalColor(Infinity)).toBe(false);
            expect(isDecimalColor(-Infinity)).toBe(false);
        });
    });

    describe('type validation', () => {
        test('should return false for string values', () => {
            expect(isDecimalColor('16777215')).toBe(false);
            expect(isDecimalColor('#FFFFFF')).toBe(false);
            expect(isDecimalColor('0xFFFFFF')).toBe(false);
            expect(isDecimalColor('white')).toBe(false);
            expect(isDecimalColor('')).toBe(false);
            expect(isDecimalColor('0')).toBe(false);
        });

        test('should return false for boolean values', () => {
            expect(isDecimalColor(true)).toBe(false);
            expect(isDecimalColor(false)).toBe(false);
        });

        test('should return false for null and undefined', () => {
            expect(isDecimalColor(null)).toBe(false);
            expect(isDecimalColor(undefined)).toBe(false);
        });

        test('should return false for objects', () => {
            expect(isDecimalColor({})).toBe(false);
            expect(isDecimalColor({ color: 16777215 })).toBe(false);
            expect(isDecimalColor(new Date())).toBe(false);
            expect(isDecimalColor(/regex/)).toBe(false);
        });

        test('should return false for arrays', () => {
            expect(isDecimalColor([])).toBe(false);
            expect(isDecimalColor([16777215])).toBe(false);
            expect(isDecimalColor([255, 255, 255])).toBe(false);
        });

        test('should return false for functions', () => {
            expect(isDecimalColor(() => 16777215)).toBe(false);
            expect(isDecimalColor(function() { return 0; })).toBe(false);
        });

        test('should return false for symbols', () => {
            expect(isDecimalColor(Symbol('color'))).toBe(false);
        });
    });

    describe('edge cases', () => {
        test('should handle boundary values correctly', () => {
            expect(isDecimalColor(-0)).toBe(true); // -0 is treated as 0
            expect(isDecimalColor(0.0)).toBe(true); // 0.0 is an integer
            expect(isDecimalColor(0xFFFFFFFF)).toBe(true);
            expect(isDecimalColor(0x100000000)).toBe(false); // Just over the limit
        });

        test('should handle Number constructor results', () => {
            expect(isDecimalColor(Number(123))).toBe(true);
            expect(isDecimalColor(Number('123'))).toBe(true);
            expect(isDecimalColor(Number('123.5'))).toBe(false);
            expect(isDecimalColor(Number('invalid'))).toBe(false);
        });

        test('should handle parseInt results', () => {
            expect(isDecimalColor(parseInt('123'))).toBe(true);
            expect(isDecimalColor(parseInt('123.5'))).toBe(true);
            expect(isDecimalColor(parseInt('invalid'))).toBe(false); // NaN
        });

        test('should handle Math operations results', () => {
            expect(isDecimalColor(Math.floor(123.5))).toBe(true);
            expect(isDecimalColor(Math.ceil(123.5))).toBe(true);
            expect(isDecimalColor(Math.round(123.5))).toBe(true);
            expect(isDecimalColor(Math.pow(2, 24))).toBe(true);
        });
    });

    describe('type guard functionality', () => {
        test('should work as a type guard in conditional blocks', () => {
            const value: any = 16777215;
            
            if (isDecimalColor(value)) {
                // In this block, TypeScript should know value is Decimal
                expect(typeof value).toBe('number');
                expect(Number.isInteger(value)).toBe(true);
            }
        });

        test('should filter arrays correctly when used as type guard', () => {
            const mixedArray: any[] = [
                16777215,
                '#FFFFFF',
                0xFF0000,
                'red',
                -1,
                0xFFFFFFFF + 1,
                123.5,
                null,
                0
            ];
            
            const validColors = mixedArray.filter(isDecimalColor);
            
            expect(validColors).toEqual([16777215, 0xFF0000, 0]);
            expect(validColors.length).toBe(3);
        });
    });

    describe('common color values', () => {
        test('should validate standard web colors', () => {
            expect(isDecimalColor(0x000000)).toBe(true); // black
            expect(isDecimalColor(0xFFFFFF)).toBe(true); // white
            expect(isDecimalColor(0xFF0000)).toBe(true); // red
            expect(isDecimalColor(0x00FF00)).toBe(true); // lime
            expect(isDecimalColor(0x0000FF)).toBe(true); // blue
            expect(isDecimalColor(0xFFFF00)).toBe(true); // yellow
            expect(isDecimalColor(0xFF00FF)).toBe(true); // magenta
            expect(isDecimalColor(0x00FFFF)).toBe(true); // cyan
        });

        test('should validate grayscale values', () => {
            expect(isDecimalColor(0x808080)).toBe(true); // gray
            expect(isDecimalColor(0xC0C0C0)).toBe(true); // silver
            expect(isDecimalColor(0x404040)).toBe(true); // dark gray
            expect(isDecimalColor(0xF0F0F0)).toBe(true); // light gray
        });
    });

    describe('performance edge cases', () => {
        test('should handle very large valid numbers efficiently', () => {
            const largeValidNumber = 0xFFFFFFFF;
            expect(isDecimalColor(largeValidNumber)).toBe(true);
        });

        test('should handle repeated calls with same values', () => {
            const testValue = 16777215;
            
            for (let i = 0; i < 100; i++) {
                expect(isDecimalColor(testValue)).toBe(true);
            }
        });

        test('should handle batch validation of mixed types', () => {
            const testValues = [
                0, 1, -1, 1.5, '123', true, null, undefined, {}, [],
                0xFFFFFF, 0xFFFFFFFF, 0x100000000, NaN, Infinity
            ];
            
            const expectedResults = [
                true, true, false, false, false, false, false, false, false, false,
                true, true, false, false, false
            ];
            
            testValues.forEach((value, index) => {
                expect(isDecimalColor(value)).toBe(expectedResults[index]);
            });
        });
    });
});