import { isRgbColor } from '../src/functions/isRgbColor.js';

describe('isRgbColor', () => {
    describe('valid RGB objects', () => {
        test('should return true for valid RGB object without alpha', () => {
            expect(isRgbColor({ r: 255, g: 0, b: 0 })).toBe(true);
            expect(isRgbColor({ r: 0, g: 255, b: 0 })).toBe(true);
            expect(isRgbColor({ r: 0, g: 0, b: 255 })).toBe(true);
            expect(isRgbColor({ r: 128, g: 128, b: 128 })).toBe(true);
        });

        test('should return true for valid RGB object with alpha', () => {
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 1 })).toBe(true);
            expect(isRgbColor({ r: 0, g: 255, b: 0, a: 0 })).toBe(true);
            expect(isRgbColor({ r: 0, g: 0, b: 255, a: 0.5 })).toBe(true);
            expect(isRgbColor({ r: 128, g: 128, b: 128, a: 0.8 })).toBe(true);
        });

        test('should return true for boundary RGB values', () => {
            expect(isRgbColor({ r: 0, g: 0, b: 0 })).toBe(true);
            expect(isRgbColor({ r: 255, g: 255, b: 255 })).toBe(true);
            expect(isRgbColor({ r: 0, g: 255, b: 128 })).toBe(true);
        });

        test('should return true for boundary alpha values', () => {
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 0 })).toBe(true);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 1 })).toBe(true);
        });

        test('should return true for RGB object with extra properties', () => {
            expect(isRgbColor({ r: 255, g: 0, b: 0, extra: 'property' })).toBe(true);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 0.5, name: 'red' })).toBe(true);
        });
    });

    describe('invalid RGB color values', () => {
        test('should return false for RGB values out of range', () => {
            expect(isRgbColor({ r: 256, g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 0, g: 256, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 0, g: 0, b: 256 })).toBe(false);
            expect(isRgbColor({ r: -1, g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 0, g: -1, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 0, g: 0, b: -1 })).toBe(false);
        });

        test('should return false for non-integer RGB values', () => {
            expect(isRgbColor({ r: 255.5, g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 0, g: 255.1, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 0, g: 0, b: 255.9 })).toBe(false);
            expect(isRgbColor({ r: 128.7, g: 128.2, b: 128.3 })).toBe(false);
        });

        test('should return false for non-numeric RGB values', () => {
            expect(isRgbColor({ r: '255', g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 0, g: '255', b: 0 })).toBe(false);
            expect(isRgbColor({ r: 0, g: 0, b: '255' })).toBe(false);
            expect(isRgbColor({ r: null, g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: undefined, g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: true, g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: [], g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: {}, g: 0, b: 0 })).toBe(false);
        });

        test('should return false for missing RGB properties', () => {
            expect(isRgbColor({ g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 255, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0 })).toBe(false);
            expect(isRgbColor({ r: 255 })).toBe(false);
            expect(isRgbColor({ g: 0 })).toBe(false);
            expect(isRgbColor({ b: 0 })).toBe(false);
        });
    });

    describe('invalid alpha values', () => {
        test('should return false for alpha values out of range', () => {
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: -0.1 })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 1.1 })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 2 })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: -1 })).toBe(false);
        });

        test('should return false for non-numeric alpha values', () => {
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: '0.5' })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: null })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: true })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: [] })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: {} })).toBe(false);
        });
    });

    describe('non-object inputs', () => {
        test('should return false for null and undefined', () => {
            expect(isRgbColor(null)).toBe(false);
            expect(isRgbColor(undefined)).toBe(false);
        });

        test('should return false for primitive values', () => {
            expect(isRgbColor('#ff0000')).toBe(false);
            expect(isRgbColor('rgb(255, 0, 0)')).toBe(false);
            expect(isRgbColor(255)).toBe(false);
            expect(isRgbColor(true)).toBe(false);
            expect(isRgbColor(false)).toBe(false);
        });

        test('should return false for arrays', () => {
            expect(isRgbColor([255, 0, 0])).toBe(false);
            expect(isRgbColor([255, 0, 0, 1])).toBe(false);
            expect(isRgbColor([])).toBe(false);
        });

        test('should return false for functions', () => {
            expect(isRgbColor(() => {})).toBe(false);
            expect(isRgbColor(function() {})).toBe(false);
        });
    });

    describe('edge cases', () => {
        test('should return false for empty object', () => {
            expect(isRgbColor({})).toBe(false);
        });

        test('should handle objects with null prototype', () => {
            const obj = Object.create(null);
            obj.r = 255;
            obj.g = 0;
            obj.b = 0;
            expect(isRgbColor(obj)).toBe(true);
        });

        test('should handle objects with properties set to NaN', () => {
            expect(isRgbColor({ r: NaN, g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 255, g: NaN, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: NaN })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: NaN })).toBe(false);
        });

        test('should handle objects with properties set to Infinity', () => {
            expect(isRgbColor({ r: Infinity, g: 0, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 255, g: Infinity, b: 0 })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: Infinity })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: Infinity })).toBe(false);
            expect(isRgbColor({ r: -Infinity, g: 0, b: 0 })).toBe(false);
        });

        test('should handle very large integers within range', () => {
            expect(isRgbColor({ r: 255, g: 255, b: 255 })).toBe(true);
        });

        test('should handle zero values correctly', () => {
            expect(isRgbColor({ r: 0, g: 0, b: 0 })).toBe(true);
            expect(isRgbColor({ r: 0, g: 0, b: 0, a: 0 })).toBe(true);
        });
    });

    describe('type safety', () => {
        test('should work as type guard', () => {
            const value: any = { r: 255, g: 0, b: 0 };
            
            if (isRgbColor(value)) {
                // TypeScript should know value is RGB here
                expect(typeof value.r).toBe('number');
                expect(typeof value.g).toBe('number');
                expect(typeof value.b).toBe('number');
            }
        });

        test('should return boolean values only', () => {
            expect(typeof isRgbColor({ r: 255, g: 0, b: 0 })).toBe('boolean');
            expect(typeof isRgbColor(null)).toBe('boolean');
            expect(typeof isRgbColor('invalid')).toBe('boolean');
        });
    });

    describe('documentation examples', () => {
        test('should match documented examples', () => {
            // From JSDoc examples
            expect(isRgbColor({ r: 255, g: 0, b: 0 })).toBe(true);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 1 })).toBe(true);
            expect(isRgbColor({ r: 256, g: 0, b: 0 })).toBe(false);
            expect(isRgbColor("#ff0000")).toBe(false);
        });
    });

    describe('comprehensive integration tests', () => {
        test('should handle mixed valid and invalid properties', () => {
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 0.5, invalid: 'prop' })).toBe(true);
            expect(isRgbColor({ r: 255, g: 0, b: 256, a: 0.5 })).toBe(false);
            expect(isRgbColor({ r: 255.5, g: 0, b: 0, a: 0.5 })).toBe(false);
        });

        test('should validate all RGB components before checking alpha', () => {
            expect(isRgbColor({ r: 256, g: 0, b: 0, a: 0.5 })).toBe(false);
            expect(isRgbColor({ r: 255, g: 256, b: 0, a: 0.5 })).toBe(false);
            expect(isRgbColor({ r: 255, g: 0, b: 256, a: 0.5 })).toBe(false);
        });

        test('should handle fractional alpha values correctly', () => {
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 0.1 })).toBe(true);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 0.99 })).toBe(true);
            expect(isRgbColor({ r: 255, g: 0, b: 0, a: 0.123456 })).toBe(true);
        });
    });
});
