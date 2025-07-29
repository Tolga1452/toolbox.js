import { isHslColor } from '../src/functions/isHslColor.js';

describe('isHslColor', () => {
    describe('valid HSL objects', () => {
        test('should return true for valid HSL object without alpha', () => {
            expect(isHslColor({ h: 0, s: 0, l: 0 })).toBe(true);
            expect(isHslColor({ h: 180, s: 50, l: 25 })).toBe(true);
            expect(isHslColor({ h: 360, s: 100, l: 50 })).toBe(true);
        });

        test('should return true for valid HSL object with alpha', () => {
            expect(isHslColor({ h: 180, s: 50, l: 25, a: 0 })).toBe(true);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: 0.5 })).toBe(true);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: 1 })).toBe(true);
        });

        test('should return true for boundary values', () => {
            expect(isHslColor({ h: 0, s: 0, l: 0 })).toBe(true);
            expect(isHslColor({ h: 360, s: 100, l: 100 })).toBe(true);
            expect(isHslColor({ h: 0, s: 0, l: 0, a: 0 })).toBe(true);
            expect(isHslColor({ h: 360, s: 100, l: 100, a: 1 })).toBe(true);
        });

        test('should return true for objects with additional properties', () => {
            expect(isHslColor({ h: 180, s: 50, l: 25, extra: 'property' })).toBe(true);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: 0.5, another: 123 })).toBe(true);
        });
    });

    describe('invalid types', () => {
        test('should return false for non-objects', () => {
            expect(isHslColor(null)).toBe(false);
            expect(isHslColor(undefined)).toBe(false);
            expect(isHslColor('#ff0000')).toBe(false);
            expect(isHslColor('hsl(180, 50%, 25%)')).toBe(false);
            expect(isHslColor(123)).toBe(false);
            expect(isHslColor(true)).toBe(false);
            expect(isHslColor(false)).toBe(false);
        });

        test('should return false for arrays', () => {
            expect(isHslColor([])).toBe(false);
            expect(isHslColor([180, 50, 25])).toBe(false);
            expect(isHslColor([180, 50, 25, 0.5])).toBe(false);
        });

        test('should return false for functions and other objects', () => {
            expect(isHslColor(() => {})).toBe(false);
            expect(isHslColor(new Date())).toBe(false);
            expect(isHslColor(/regex/)).toBe(false);
        });
    });

    describe('objects with missing properties', () => {
        test('should return false for objects missing h property', () => {
            expect(isHslColor({ s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ s: 50, l: 25, a: 0.5 })).toBe(false);
        });

        test('should return false for objects missing s property', () => {
            expect(isHslColor({ h: 180, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, l: 25, a: 0.5 })).toBe(false);
        });

        test('should return false for objects missing l property', () => {
            expect(isHslColor({ h: 180, s: 50 })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, a: 0.5 })).toBe(false);
        });

        test('should return false for empty object', () => {
            expect(isHslColor({})).toBe(false);
        });
    });

    describe('objects with invalid property types', () => {
        test('should return false for non-integer h values', () => {
            expect(isHslColor({ h: 180.5, s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: '180', s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: null, s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: undefined, s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: true, s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: NaN, s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: Infinity, s: 50, l: 25 })).toBe(false);
        });

        test('should return false for non-integer s values', () => {
            expect(isHslColor({ h: 180, s: 50.5, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: '50', l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: null, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: undefined, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: true, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: NaN, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: Infinity, l: 25 })).toBe(false);
        });

        test('should return false for non-integer l values', () => {
            expect(isHslColor({ h: 180, s: 50, l: 25.5 })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: '25' })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: null })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: undefined })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: true })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: NaN })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: Infinity })).toBe(false);
        });
    });

    describe('objects with values outside valid ranges', () => {
        test('should return false for h values outside 0-360 range', () => {
            expect(isHslColor({ h: -1, s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: 361, s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: 400, s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: -180, s: 50, l: 25 })).toBe(false);
        });

        test('should return false for s values outside 0-100 range', () => {
            expect(isHslColor({ h: 180, s: -1, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: 101, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: 150, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: -50, l: 25 })).toBe(false);
        });

        test('should return false for l values outside 0-100 range', () => {
            expect(isHslColor({ h: 180, s: 50, l: -1 })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 101 })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 150 })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: -25 })).toBe(false);
        });
    });

    describe('objects with invalid alpha values', () => {
        test('should return false for non-number alpha values', () => {
            expect(isHslColor({ h: 180, s: 50, l: 25, a: '0.5' })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: true })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: null })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: {} })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: [] })).toBe(false);
        });

        test('should return false for alpha values outside 0-1 range', () => {
            expect(isHslColor({ h: 180, s: 50, l: 25, a: -0.1 })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: 1.1 })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: 2 })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: -1 })).toBe(false);
        });

        test('should return false for special number alpha values', () => {
            expect(isHslColor({ h: 180, s: 50, l: 25, a: NaN })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: Infinity })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: -Infinity })).toBe(false);
        });
    });

    describe('example cases from documentation', () => {
        test('should match documented examples', () => {
            expect(isHslColor({ h: 360, s: 100, l: 50 })).toBe(true);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: 0.5 })).toBe(true);
            expect(isHslColor({ h: 361, s: 50, l: 50 })).toBe(false);
            expect(isHslColor("#ff0000")).toBe(false);
        });
    });

    describe('edge cases and boundary values', () => {
        test('should handle exact boundary values correctly', () => {
            // Test exact boundaries
            expect(isHslColor({ h: 0, s: 0, l: 0 })).toBe(true);
            expect(isHslColor({ h: 360, s: 100, l: 100 })).toBe(true);
            expect(isHslColor({ h: 0, s: 0, l: 0, a: 0 })).toBe(true);
            expect(isHslColor({ h: 360, s: 100, l: 100, a: 1 })).toBe(true);
        });

        test('should handle negative zero correctly', () => {
            expect(isHslColor({ h: -0, s: -0, l: -0 })).toBe(true);
            expect(isHslColor({ h: 180, s: 50, l: 25, a: -0 })).toBe(true);
        });

        test('should handle objects with property getters', () => {
            const objWithGetters = {
                get h() { return 180; },
                get s() { return 50; },
                get l() { return 25; }
            };
            expect(isHslColor(objWithGetters)).toBe(true);

            const objWithInvalidGetter = {
                get h() { return 180.5; },
                get s() { return 50; },
                get l() { return 25; }
            };
            expect(isHslColor(objWithInvalidGetter)).toBe(false);
        });

        test('should handle very large integer values', () => {
            expect(isHslColor({ h: 999999, s: 50, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: 999999, l: 25 })).toBe(false);
            expect(isHslColor({ h: 180, s: 50, l: 999999 })).toBe(false);
        });
    });

    describe('type guard functionality', () => {
        test('should work as type guard in conditional blocks', () => {
            const value: unknown = { h: 180, s: 50, l: 25 };
            
            if (isHslColor(value)) {
                // TypeScript should recognize value as HSL here
                expect(value.h).toBe(180);
                expect(value.s).toBe(50);
                expect(value.l).toBe(25);
            } else {
                fail('Type guard should have returned true');
            }
        });

        test('should work with array filtering', () => {
            const values = [
                { h: 180, s: 50, l: 25 },
                '#ff0000',
                { h: 360, s: 100, l: 50, a: 0.5 },
                { h: 361, s: 50, l: 50 },
                null
            ];

            const hslColors = values.filter(isHslColor);
            expect(hslColors).toHaveLength(2);
            expect(hslColors[0]).toEqual({ h: 180, s: 50, l: 25 });
            expect(hslColors[1]).toEqual({ h: 360, s: 100, l: 50, a: 0.5 });
        });
    });
});
