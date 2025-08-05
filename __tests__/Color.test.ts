// @ts-nocheck
import { Color } from '../src/classes';
import { RgbByte } from '../src/types';

describe('Color', () => {
    describe('fromDecimal', () => {
        describe('validation', () => {
            test('should throw TypeError for non-integer values', () => {
                expect(() => Color.fromDecimal(123.45)).toThrow(TypeError);
                expect(() => Color.fromDecimal(NaN)).toThrow(TypeError);
                expect(() => Color.fromDecimal(Infinity)).toThrow(TypeError);
                expect(() => Color.fromDecimal('123' as any)).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-integer', () => {
                expect(() => Color.fromDecimal(123.45)).toThrow('`decimal` must be an integer');
            });

            test('should throw RangeError for out-of-range values', () => {
                expect(() => Color.fromDecimal(-1)).toThrow(RangeError);
                expect(() => Color.fromDecimal(0xFFFFFFFF + 1)).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range', () => {
                expect(() => Color.fromDecimal(-1)).toThrow('`decimal` must be between 0 and 4294967295 (0xFFFFFFFF), inclusive');
            });
        });

        describe('functionality', () => {
            test('should create Color from valid decimal values', () => {
                const color1 = Color.fromDecimal(0);
                const color2 = Color.fromDecimal(0xFFFFFF);
                const color3 = Color.fromDecimal(0xFF5733);
                
                expect(color1.toDecimal()).toBe(0);
                expect(color2.toDecimal()).toBe(0xFFFFFF);
                expect(color3.toDecimal()).toBe(0xFF5733);
            });

            test('should handle boundary values', () => {
                const min = Color.fromDecimal(0);
                const max = Color.fromDecimal(0xFFFFFFFF);
                
                expect(min.toDecimal()).toBe(0);
                expect(max.toDecimal()).toBe(0xFFFFFFFF);
            });
        });
    });

    describe('fromHex', () => {
        describe('validation', () => {
            test('should throw TypeError for non-string values', () => {
                expect(() => Color.fromHex(123 as any)).toThrow(TypeError);
                expect(() => Color.fromHex(null as any)).toThrow(TypeError);
                expect(() => Color.fromHex(undefined as any)).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-string', () => {
                expect(() => Color.fromHex(123 as any)).toThrow('`hex` must be a string');
            });

            test('should throw SyntaxError for invalid hex format', () => {
                expect(() => Color.fromHex('FF5733')).toThrow(SyntaxError);
                expect(() => Color.fromHex('#GG5733')).toThrow(SyntaxError);
                expect(() => Color.fromHex('#FP57')).toThrow(SyntaxError);
                expect(() => Color.fromHex('#FF5733F')).toThrow(SyntaxError);
            });

            test('should throw SyntaxError with correct message for invalid format', () => {
                expect(() => Color.fromHex('FF5733')).toThrow('`hex` must be a valid hexadecimal color code (e.g. `#FFFFFF`)');
            });
        });

        describe('functionality', () => {
            test('should parse 3-digit hex codes', () => {
                const color = Color.fromHex('#F73');
                const rgb = color.toRgb();
                expect(rgb.r).toBe(255);
                expect(rgb.g).toBe(119);
                expect(rgb.b).toBe(51);
            });

            test('should parse 4-digit hex codes with alpha', () => {
                const color = Color.fromHex('#F73A');
                const rgb = color.toRgb();
                expect(rgb.r).toBe(255);
                expect(rgb.g).toBe(119);
                expect(rgb.b).toBe(51);
                expect(rgb.a).toBeCloseTo(0.667, 2);
            });

            test('should parse 6-digit hex codes', () => {
                const color = Color.fromHex('#FF5733');
                expect(color.toDecimal()).toBe(0xFF5733);
            });

            test('should parse 8-digit hex codes with alpha', () => {
                const color = Color.fromHex('#FF5733AA');
                expect(color.toDecimal()).toBe(0xAAFF5733);
            });

            test('should handle lowercase hex codes', () => {
                const color = Color.fromHex('#ff5733');
                expect(color.toDecimal()).toBe(0xFF5733);
            });
        });
    });

    describe('fromRgb', () => {
        describe('validation', () => {
            test('should throw TypeError for non-object values', () => {
                expect(() => Color.fromRgb('rgb' as any)).toThrow(TypeError);
                expect(() => Color.fromRgb(null as any)).toThrow(TypeError);
                expect(() => Color.fromRgb(123 as any)).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-object', () => {
                expect(() => Color.fromRgb('rgb' as any)).toThrow('`rgb` must be an RGB object');
            });

            test('should throw TypeError for non-integer rgb values', () => {
                expect(() => Color.fromRgb({ r: 255.5, g: 87, b: 51 })).toThrow(TypeError);
                expect(() => Color.fromRgb({ r: 255, g: 87.5, b: 51 })).toThrow(TypeError);
                expect(() => Color.fromRgb({ r: 255, g: 87, b: 51.5 })).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-integer rgb', () => {
                expect(() => Color.fromRgb({ r: 255.5, g: 87, b: 51 })).toThrow('`rgb` must have `r`, `g`, and `b` properties that are integers');
            });

            test('should throw RangeError for out-of-range rgb values', () => {
                expect(() => Color.fromRgb({ r: -1, g: 87, b: 51 })).toThrow(RangeError);
                expect(() => Color.fromRgb({ r: 256, g: 87, b: 51 })).toThrow(RangeError);
                expect(() => Color.fromRgb({ r: 255, g: -1, b: 51 })).toThrow(RangeError);
                expect(() => Color.fromRgb({ r: 255, g: 256, b: 51 })).toThrow(RangeError);
                expect(() => Color.fromRgb({ r: 255, g: 87, b: -1 })).toThrow(RangeError);
                expect(() => Color.fromRgb({ r: 255, g: 87, b: 256 })).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range rgb', () => {
                expect(() => Color.fromRgb({ r: -1, g: 87, b: 51 })).toThrow('`rgb` must have `r`, `g`, and `b` properties that are between 0 and 255, inclusive');
            });

            test('should throw TypeError for invalid alpha type', () => {
                expect(() => Color.fromRgb({ r: 255, g: 87, b: 51, a: 'invalid' as any })).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for invalid alpha type', () => {
                expect(() => Color.fromRgb({ r: 255, g: 87, b: 51, a: 'invalid' as any })).toThrow('`a` property of `rgb` must be a number');
            });

            test('should throw RangeError for out-of-range alpha values', () => {
                expect(() => Color.fromRgb({ r: 255, g: 87, b: 51, a: -0.1 })).toThrow(RangeError);
                expect(() => Color.fromRgb({ r: 255, g: 87, b: 51, a: 1.1 })).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range alpha', () => {
                expect(() => Color.fromRgb({ r: 255, g: 87, b: 51, a: -0.1 })).toThrow('`a` property of `rgb` must be between 0 and 1, inclusive');
            });
        });

        describe('functionality', () => {
            test('should create Color from RGB without alpha', () => {
                const color = Color.fromRgb({ r: 255, g: 87, b: 51 });
                const rgb = color.toRgb();
                expect(rgb.r).toBe(255);
                expect(rgb.g).toBe(87);
                expect(rgb.b).toBe(51);
                expect(rgb.a).toBeUndefined();
            });

            test('should create Color from RGB with alpha', () => {
                const color = Color.fromRgb({ r: 255, g: 87, b: 51, a: 0.5 });
                const rgb = color.toRgb();
                expect(rgb.r).toBe(255);
                expect(rgb.g).toBe(87);
                expect(rgb.b).toBe(51);
                expect(rgb.a).toBeCloseTo(0.5, 2);
            });

            test('should handle boundary RGB values', () => {
                const black = Color.fromRgb({ r: 0, g: 0, b: 0 });
                const white = Color.fromRgb({ r: 255, g: 255, b: 255 });
                
                expect(black.toRgb()).toEqual({ r: 0, g: 0, b: 0, a: undefined });
                expect(white.toRgb()).toEqual({ r: 255, g: 255, b: 255, a: undefined });
            });

            test('should handle boundary alpha values', () => {
                const transparent = Color.fromRgb({ r: 255, g: 87, b: 51, a: 0 });
                const opaque = Color.fromRgb({ r: 255, g: 87, b: 51, a: 1 });
                
                expect(transparent.toRgb().a).toBe(0);
                expect(opaque.toRgb().a).toBeCloseTo(1, 2);
            });
        });
    });

    describe('fromHsl', () => {
        describe('validation', () => {
            test('should throw TypeError for non-object values', () => {
                expect(() => Color.fromHsl('hsl' as any)).toThrow(TypeError);
                expect(() => Color.fromHsl(null as any)).toThrow(TypeError);
                expect(() => Color.fromHsl(123 as any)).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-object', () => {
                expect(() => Color.fromHsl('hsl' as any)).toThrow('`hsl` must be an HSL object');
            });

            test('should throw TypeError for non-number hsl values', () => {
                expect(() => Color.fromHsl({ h: 'invalid' as any, s: 100, l: 50 })).toThrow(TypeError);
                expect(() => Color.fromHsl({ h: 360, s: 'invalid' as any, l: 50 })).toThrow(TypeError);
                expect(() => Color.fromHsl({ h: 360, s: 100, l: 'invalid' as any })).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-number hsl', () => {
                expect(() => Color.fromHsl({ h: 'invalid' as any, s: 100, l: 50 })).toThrow('`hsl` must have `h`, `s`, and `l` properties that are numbers');
            });

            test('should throw RangeError for out-of-range hue values', () => {
                expect(() => Color.fromHsl({ h: -1, s: 100, l: 50 })).toThrow(RangeError);
                expect(() => Color.fromHsl({ h: 361, s: 100, l: 50 })).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range hue', () => {
                expect(() => Color.fromHsl({ h: -1, s: 100, l: 50 })).toThrow('`h` property of `hsl` must be between 0 and 360, inclusive');
            });

            test('should throw RangeError for out-of-range saturation and lightness values', () => {
                expect(() => Color.fromHsl({ h: 360, s: -1, l: 50 })).toThrow(RangeError);
                expect(() => Color.fromHsl({ h: 360, s: 101, l: 50 })).toThrow(RangeError);
                expect(() => Color.fromHsl({ h: 360, s: 100, l: -1 })).toThrow(RangeError);
                expect(() => Color.fromHsl({ h: 360, s: 100, l: 101 })).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range s/l', () => {
                expect(() => Color.fromHsl({ h: 360, s: -1, l: 50 })).toThrow('`s` and `l` properties of `hsl` must be between 0 and 100, inclusive');
            });

            test('should throw TypeError for invalid alpha type', () => {
                expect(() => Color.fromHsl({ h: 360, s: 100, l: 50, a: 'invalid' as any })).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for invalid alpha type', () => {
                expect(() => Color.fromHsl({ h: 360, s: 100, l: 50, a: 'invalid' as any })).toThrow('`a` property of `hsl` must be a number');
            });

            test('should throw RangeError for out-of-range alpha values', () => {
                expect(() => Color.fromHsl({ h: 360, s: 100, l: 50, a: -0.1 })).toThrow(RangeError);
                expect(() => Color.fromHsl({ h: 360, s: 100, l: 50, a: 1.1 })).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range alpha', () => {
                expect(() => Color.fromHsl({ h: 360, s: 100, l: 50, a: -0.1 })).toThrow('`a` property of `hsl` must be between 0 and 1, inclusive');
            });
        });

        describe('functionality', () => {
            test('should create Color from HSL values', () => {
                const color = Color.fromHsl({ h: 0, s: 100, l: 50 });
                const rgb = color.toRgb();
                expect(rgb.r).toBe(255);
                expect(rgb.g).toBe(0);
                expect(rgb.b).toBe(0);
            });

            test('should handle grayscale colors (s=0)', () => {
                const gray = Color.fromHsl({ h: 0, s: 0, l: 50 });
                const rgb = gray.toRgb();
                expect(rgb.r).toBe(rgb.g);
                expect(rgb.g).toBe(rgb.b);
                expect(rgb.r).toBeCloseTo(128, 0);
            });

            test('should handle hue wraparound', () => {
                const color1 = Color.fromHsl({ h: 0, s: 100, l: 50 });
                const color2 = Color.fromHsl({ h: 360, s: 100, l: 50 });
                expect(color1.toRgb()).toEqual(color2.toRgb());
            });

            test('should handle HSL with alpha', () => {
                const color = Color.fromHsl({ h: 120, s: 100, l: 50, a: 0.5 });
                const rgb = color.toRgb();
                expect(rgb.a).toBeCloseTo(0.5, 2);
            });
        });
    });

    describe('fromCmyk', () => {
        describe('validation', () => {
            test('should throw TypeError for non-object values', () => {
                expect(() => Color.fromCmyk('cmyk' as any)).toThrow(TypeError);
                expect(() => Color.fromCmyk(null as any)).toThrow(TypeError);
                expect(() => Color.fromCmyk(123 as any)).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-object', () => {
                expect(() => Color.fromCmyk('cmyk' as any)).toThrow('`cmyk` must be a CMYK object');
            });

            test('should throw TypeError for non-number cmyk values', () => {
                expect(() => Color.fromCmyk({ c: 'invalid' as any, m: 100, y: 100, k: 0 })).toThrow(TypeError);
                expect(() => Color.fromCmyk({ c: 0, m: 'invalid' as any, y: 100, k: 0 })).toThrow(TypeError);
                expect(() => Color.fromCmyk({ c: 0, m: 100, y: 'invalid' as any, k: 0 })).toThrow(TypeError);
                expect(() => Color.fromCmyk({ c: 0, m: 100, y: 100, k: 'invalid' as any })).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-number cmyk', () => {
                expect(() => Color.fromCmyk({ c: 'invalid' as any, m: 100, y: 100, k: 0 })).toThrow('`cmyk` must have `c`, `m`, `y`, and `k` properties that are numbers');
            });

            test('should throw RangeError for out-of-range cmyk values', () => {
                expect(() => Color.fromCmyk({ c: -1, m: 100, y: 100, k: 0 })).toThrow(RangeError);
                expect(() => Color.fromCmyk({ c: 101, m: 100, y: 100, k: 0 })).toThrow(RangeError);
                expect(() => Color.fromCmyk({ c: 0, m: -1, y: 100, k: 0 })).toThrow(RangeError);
                expect(() => Color.fromCmyk({ c: 0, m: 101, y: 100, k: 0 })).toThrow(RangeError);
                expect(() => Color.fromCmyk({ c: 0, m: 100, y: -1, k: 0 })).toThrow(RangeError);
                expect(() => Color.fromCmyk({ c: 0, m: 100, y: 101, k: 0 })).toThrow(RangeError);
                expect(() => Color.fromCmyk({ c: 0, m: 100, y: 100, k: -1 })).toThrow(RangeError);
                expect(() => Color.fromCmyk({ c: 0, m: 100, y: 100, k: 101 })).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range cmyk', () => {
                expect(() => Color.fromCmyk({ c: -1, m: 100, y: 100, k: 0 })).toThrow('`c`, `m`, `y`, and `k` properties of `cmyk` must be between 0 and 100, inclusive');
            });
        });

        describe('functionality', () => {
            test('should create Color from CMYK values', () => {
                const color = Color.fromCmyk({ c: 0, m: 100, y: 100, k: 0 });
                const rgb = color.toRgb();
                expect(rgb.r).toBe(255);
                expect(rgb.g).toBe(0);
                expect(rgb.b).toBe(0);
            });

            test('should handle pure black (k=100)', () => {
                const black = Color.fromCmyk({ c: 0, m: 0, y: 0, k: 100 });
                const rgb = black.toRgb();
                expect(rgb.r).toBe(0);
                expect(rgb.g).toBe(0);
                expect(rgb.b).toBe(0);
            });

            test('should handle pure white (c=m=y=k=0)', () => {
                const white = Color.fromCmyk({ c: 0, m: 0, y: 0, k: 0 });
                const rgb = white.toRgb();
                expect(rgb.r).toBe(255);
                expect(rgb.g).toBe(255);
                expect(rgb.b).toBe(255);
            });
        });
    });

    describe('toDecimal', () => {
        test('should return internal decimal value by default', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(color.toDecimal()).toBe(0xFF5733);
        });

        test('should throw TypeError for non-array byteOrder', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(() => color.toDecimal('invalid' as any)).toThrow(TypeError);
        });

        test('should throw TypeError with correct message for non-array byteOrder', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(() => color.toDecimal('invalid' as any)).toThrow('`byteOrder` must be an array of RgbByte values');
        });

        test('should throw RangeError for invalid byteOrder length', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(() => color.toDecimal([RgbByte.Red, RgbByte.Green] as any)).toThrow(RangeError);
            expect(() => color.toDecimal([RgbByte.Red, RgbByte.Green, RgbByte.Blue, RgbByte.Alpha, RgbByte.Red] as any)).toThrow(RangeError);
        });

        test('should throw RangeError with correct message for invalid length', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(() => color.toDecimal([RgbByte.Red, RgbByte.Green] as any)).toThrow('`byteOrder` must have 3 or 4 elements');
        });

        test('should throw TypeError for invalid RgbByte values', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(() => color.toDecimal(['invalid' as any, RgbByte.Green, RgbByte.Blue])).toThrow(TypeError);
        });

        test('should throw TypeError with correct message for invalid RgbByte', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(() => color.toDecimal(['invalid' as any, RgbByte.Green, RgbByte.Blue])).toThrow('`byteOrder` must contain only RgbByte values');
        });

        test('should throw RangeError for duplicate RgbByte values', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(() => color.toDecimal([RgbByte.Red, RgbByte.Red, RgbByte.Blue])).toThrow(RangeError);
        });

        test('should throw RangeError with correct message for duplicates', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(() => color.toDecimal([RgbByte.Red, RgbByte.Red, RgbByte.Blue])).toThrow('`byteOrder` must not contain duplicate RgbByte values');
        });

        test('should reorder bytes according to byteOrder parameter', () => {
            const color = Color.fromDecimal(0xFF5733);
            const bgr = color.toDecimal([RgbByte.Blue, RgbByte.Green, RgbByte.Red]);
            expect(bgr).toBe(0x3357FF);
        });

        test('should handle alpha channel in byteOrder', () => {
            const color = Color.fromRgb({ r: 255, g: 87, b: 51, a: 0.5 });
            const argb = color.toDecimal([RgbByte.Alpha, RgbByte.Red, RgbByte.Green, RgbByte.Blue]);
            expect(argb).toBe(color.toDecimal());
        });
    });

    describe('toHex', () => {
        test('should return 6-digit hex by default', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(color.toHex()).toBe('#FF5733');
        });

        test('should pad with zeros for smaller values', () => {
            const color = Color.fromDecimal(0x123);
            expect(color.toHex()).toBe('#000123');
        });

        test('should handle different digit counts', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(color.toHex(3)).toBe('#F73');
            expect(color.toHex(8)).toBe('#00FF5733');
        });

        test('should handle negative values correctly', () => {
            const color = Color.fromDecimal(0xFFFF5733);
            expect(color.toHex(8)).toBe('#FFFF5733');
        });

        test('should return uppercase hex', () => {
            const color = Color.fromDecimal(0xabcdef);
            expect(color.toHex()).toBe('#ABCDEF');
        });
    });

    describe('toRgb', () => {
        test('should convert to RGB without alpha', () => {
            const color = Color.fromDecimal(0xFF5733);
            const rgb = color.toRgb();
            expect(rgb).toEqual({ r: 255, g: 87, b: 51, a: undefined });
        });

        test('should convert to RGB with alpha', () => {
            const color = Color.fromDecimal(0x80FF5733);
            const rgb = color.toRgb();
            expect(rgb.r).toBe(255);
            expect(rgb.g).toBe(87);
            expect(rgb.b).toBe(51);
            expect(rgb.a).toBeCloseTo(0.502, 2);
        });

        test('should handle boundary values', () => {
            const black = Color.fromDecimal(0x000000);
            const white = Color.fromDecimal(0xFFFFFF);
            
            expect(black.toRgb()).toEqual({ r: 0, g: 0, b: 0, a: undefined });
            expect(white.toRgb()).toEqual({ r: 255, g: 255, b: 255, a: undefined });
        });
    });

    describe('toHsl', () => {
        test('should convert RGB to HSL', () => {
            const red = Color.fromRgb({ r: 255, g: 0, b: 0 });
            const hsl = red.toHsl();
            expect(hsl.h).toBe(0);
            expect(hsl.s).toBe(100);
            expect(hsl.l).toBe(50);
        });

        test('should handle grayscale colors', () => {
            const gray = Color.fromRgb({ r: 128, g: 128, b: 128 });
            const hsl = gray.toHsl();
            expect(hsl.h).toBe(0);
            expect(hsl.s).toBe(0);
            expect(hsl.l).toBeCloseTo(50.2, 2);
        });

        test('should preserve alpha channel', () => {
            const color = Color.fromRgb({ r: 255, g: 0, b: 0, a: 0.5 });
            const hsl = color.toHsl();
            expect(hsl.a).toBeCloseTo(0.5, 2);
        });

        test('should handle negative hue correctly', () => {
            const color = Color.fromRgb({ r: 255, g: 0, b: 128 });
            const hsl = color.toHsl();
            expect(hsl.h).toBeGreaterThanOrEqual(0);
            expect(hsl.h).toBeLessThan(360);
        });
    });

    describe('toCmyk', () => {
        test('should convert RGB to CMYK', () => {
            const red = Color.fromRgb({ r: 255, g: 0, b: 0 });
            const cmyk = red.toCmyk();
            expect(cmyk.c).toBe(0);
            expect(cmyk.m).toBe(100);
            expect(cmyk.y).toBe(100);
            expect(cmyk.k).toBe(0);
        });

        test('should handle pure black', () => {
            const black = Color.fromRgb({ r: 0, g: 0, b: 0 });
            const cmyk = black.toCmyk();
            expect(cmyk.c).toBe(0);
            expect(cmyk.m).toBe(0);
            expect(cmyk.y).toBe(0);
            expect(cmyk.k).toBe(100);
        });

        test('should handle pure white', () => {
            const white = Color.fromRgb({ r: 255, g: 255, b: 255 });
            const cmyk = white.toCmyk();
            expect(cmyk.c).toBe(0);
            expect(cmyk.m).toBe(0);
            expect(cmyk.y).toBe(0);
            expect(cmyk.k).toBe(0);
        });

        test('should round values to 1 decimal place', () => {
            const color = Color.fromRgb({ r: 200, g: 150, b: 100 });
            const cmyk = color.toCmyk();
            
            // All values should be numbers with at most 1 decimal place
            expect(cmyk.c % 0.1).toBeCloseTo(0, 10);
            expect(cmyk.m % 0.1).toBeCloseTo(0.09999999999, 10);
            expect(cmyk.y % 0.1).toBeCloseTo(0.09999999999, 10);
            expect(cmyk.k % 0.1).toBeCloseTo(0, 10);
        });
    });

    describe('integration and round-trip conversions', () => {
        test('should maintain consistency through RGB round-trip', () => {
            const original = { r: 255, g: 87, b: 51 };
            const color = Color.fromRgb(original);
            const result = color.toRgb();
            
            expect(result.r).toBe(original.r);
            expect(result.g).toBe(original.g);
            expect(result.b).toBe(original.b);
        });

        test('should maintain consistency through hex round-trip', () => {
            const original = '#FF5733';
            const color = Color.fromHex(original);
            const result = color.toHex();
            
            expect(result).toBe(original);
        });

        test('should maintain consistency through decimal round-trip', () => {
            const original = 0xFF5733;
            const color = Color.fromDecimal(original);
            const result = color.toDecimal();
            
            expect(result).toBe(original);
        });

        test('should handle complex conversion chain', () => {
            const originalHex = '#FF5733';
            const color = Color.fromHex(originalHex);
            const rgb = color.toRgb();
            const hsl = color.toHsl();
            const cmyk = color.toCmyk();
            const decimal = color.toDecimal();
            const resultHex = color.toHex();
            
            expect(resultHex).toBe(originalHex);
            expect(rgb.r).toBe(255);
            expect(rgb.g).toBe(87);
            expect(rgb.b).toBe(51);
            expect(decimal).toBe(0xFF5733);
            
            // HSL and CMYK should be reasonable
            expect(hsl.h).toBeGreaterThanOrEqual(0);
            expect(hsl.h).toBeLessThan(360);
            expect(hsl.s).toBeGreaterThanOrEqual(0);
            expect(hsl.s).toBeLessThanOrEqual(100);
            expect(hsl.l).toBeGreaterThanOrEqual(0);
            expect(hsl.l).toBeLessThanOrEqual(100);
            
            expect(cmyk.c).toBeGreaterThanOrEqual(0);
            expect(cmyk.c).toBeLessThanOrEqual(100);
            expect(cmyk.m).toBeGreaterThanOrEqual(0);
            expect(cmyk.m).toBeLessThanOrEqual(100);
            expect(cmyk.y).toBeGreaterThanOrEqual(0);
            expect(cmyk.y).toBeLessThanOrEqual(100);
            expect(cmyk.k).toBeGreaterThanOrEqual(0);
            expect(cmyk.k).toBeLessThanOrEqual(100);
        });

        test('should handle alpha channel consistently', () => {
            const originalRgb = { r: 255, g: 87, b: 51, a: 0.5 };
            const color = Color.fromRgb(originalRgb);
            const resultRgb = color.toRgb();
            const hsl = color.toHsl();
            
            expect(resultRgb.a).toBeCloseTo(originalRgb.a!, 2);
            expect(hsl.a).toBeCloseTo(originalRgb.a!, 2);
        });

        test('should convert between different formats correctly', () => {
            // Test a known color: orange
            const hex = '#FFA500';
            const expectedRgb = { r: 255, g: 165, b: 0 };
            
            const colorFromHex = Color.fromHex(hex);
            const colorFromRgb = Color.fromRgb(expectedRgb);
            
            expect(colorFromHex.toRgb()).toEqual({ ...expectedRgb, a: undefined });
            expect(colorFromRgb.toHex()).toBe(hex);
            expect(colorFromHex.toDecimal()).toBe(colorFromRgb.toDecimal());
        });
    });

    describe('edge cases and boundary values', () => {
        test('should handle minimum and maximum decimal values', () => {
            const min = Color.fromDecimal(0);
            const max = Color.fromDecimal(0xFFFFFFFF);
            
            expect(min.toRgb()).toEqual({ r: 0, g: 0, b: 0, a: undefined });
            expect(max.toRgb().r).toBe(255);
            expect(max.toRgb().g).toBe(255);
            expect(max.toRgb().b).toBe(255);
            expect(max.toRgb().a).toBeCloseTo(1, 2);
        });

        test('should handle alpha precision', () => {
            const color = Color.fromRgb({ r: 255, g: 87, b: 51, a: 0.00392157 }); // 1/255
            const rgb = color.toRgb();
            expect(rgb.a).toBeCloseTo(0.004, 2);
        });

        test('should handle hue boundary conditions', () => {
            const color1 = Color.fromHsl({ h: 0, s: 100, l: 50 });
            const color2 = Color.fromHsl({ h: 360, s: 100, l: 50 });
            
            expect(color1.toRgb()).toEqual(color2.toRgb());
        });

        test('should handle saturation and lightness extremes', () => {
            const noSaturation = Color.fromHsl({ h: 180, s: 0, l: 50 });
            const fullSaturation = Color.fromHsl({ h: 180, s: 100, l: 50 });
            const noLightness = Color.fromHsl({ h: 180, s: 100, l: 0 });
            const fullLightness = Color.fromHsl({ h: 180, s: 100, l: 100 });
            
            const rgb1 = noSaturation.toRgb();
            expect(rgb1.r).toBe(rgb1.g);
            expect(rgb1.g).toBe(rgb1.b);
            
            const rgb2 = fullSaturation.toRgb();
            expect(rgb2.r).toBe(0);
            expect(rgb2.g).toBe(255);
            expect(rgb2.b).toBe(255);
            
            expect(noLightness.toRgb()).toEqual({ r: 0, g: 0, b: 0, a: undefined });
            expect(fullLightness.toRgb()).toEqual({ r: 255, g: 255, b: 255, a: undefined });
        });

        test('should handle CMYK edge cases', () => {
            const allZero = Color.fromCmyk({ c: 0, m: 0, y: 0, k: 0 });
            const allMax = Color.fromCmyk({ c: 100, m: 100, y: 100, k: 100 });
            
            expect(allZero.toRgb()).toEqual({ r: 255, g: 255, b: 255, a: undefined });
            expect(allMax.toRgb()).toEqual({ r: 0, g: 0, b: 0, a: undefined });
        });

        test('should handle very small decimal values in hex conversion', () => {
            const color = Color.fromDecimal(1);
            expect(color.toHex()).toBe('#000001');
            expect(color.toHex(8)).toBe('#00000001');
        });

        test('should handle precision in HSL calculations', () => {
            // Test a color that might cause precision issues
            const color = Color.fromRgb({ r: 1, g: 2, b: 3 });
            const hsl = color.toHsl();
            
            expect(hsl.h).toBeGreaterThanOrEqual(0);
            expect(hsl.h).toBeLessThan(360);
            expect(hsl.s).toBeGreaterThanOrEqual(0);
            expect(hsl.s).toBeLessThanOrEqual(100);
            expect(hsl.l).toBeGreaterThanOrEqual(0);
            expect(hsl.l).toBeLessThanOrEqual(100);
        });
    });

    describe('example usage from documentation', () => {
        test('should match fromDecimal example', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(color.toDecimal()).toBe(0xFF5733);
        });

        test('should match fromHex example', () => {
            const color = Color.fromHex('#FF5733');
            expect(color.toHex()).toBe('#FF5733');
        });

        test('should match fromRgb example', () => {
            const color = Color.fromRgb({ r: 255, g: 87, b: 51 });
            const rgb = color.toRgb();
            expect(rgb.r).toBe(255);
            expect(rgb.g).toBe(87);
            expect(rgb.b).toBe(51);
        });

        test('should match fromHsl example', () => {
            const color = Color.fromHsl({ h: 360, s: 100, l: 50 });
            const rgb = color.toRgb();
            expect(rgb.r).toBe(255);
            expect(rgb.g).toBe(0);
            expect(rgb.b).toBe(0);
        });

        test('should match fromCmyk example', () => {
            const color = Color.fromCmyk({ c: 0, m: 100, y: 100, k: 0 });
            const rgb = color.toRgb();
            expect(rgb.r).toBe(255);
            expect(rgb.g).toBe(0);
            expect(rgb.b).toBe(0);
        });

        test('should match toDecimal examples', () => {
            const color1 = Color.fromHex("#FF5733");
            expect(color1.toDecimal()).toBe(0xFF5733);

            const color2 = Color.fromHex("#FF5733FF");
            expect(color2.toDecimal([RgbByte.Red, RgbByte.Green, RgbByte.Blue])).toBe(0xFF5733);
        });

        test('should match toHex examples', () => {
            const color1 = Color.fromDecimal(0xFF5733);
            expect(color1.toHex()).toBe("#FF5733");

            const color2 = Color.fromDecimal(0xFF5733FF);
            expect(color2.toHex(8)).toBe("#FF5733FF");
        });

        test('should match toRgb example', () => {
            const color = Color.fromHex("#FF5733");
            expect(color.toRgb()).toEqual({ r: 255, g: 87, b: 51, a: undefined });
        });

        test('should match toHsl example', () => {
            const color = Color.fromHex("#FF5733");
            const hsl = color.toHsl();
            expect(Math.round(hsl.h)).toBe(11);
            expect(Math.round(hsl.s)).toBe(100);
            expect(Math.round(hsl.l)).toBe(60);
        });

        test('should match toCmyk example', () => {
            const color = Color.fromHex("#FF5733");
            const cmyk = color.toCmyk();
            expect(cmyk.c).toBe(0);
            expect(Math.round(cmyk.m)).toBe(66);
            expect(Math.round(cmyk.y)).toBe(80);
            expect(cmyk.k).toBe(0);
        });
    });

    describe('lighten', () => {
        describe('validation', () => {
            test('should throw TypeError for non-number amount', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.lighten('20' as any)).toThrow(TypeError);
                expect(() => color.lighten(null as any)).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-number', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.lighten('20' as any)).toThrow('`amount` must be a number');
            });

            test('should throw RangeError for out-of-range amount', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.lighten(-1)).toThrow(RangeError);
                expect(() => color.lighten(101)).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.lighten(-1)).toThrow('`amount` must be between 0 and 100, inclusive');
            });
        });

        describe('functionality', () => {
            test('should lighten color by default amount (20%)', () => {
                const color = Color.fromHex('#FF5733');
                const originalLightness = color.lightness;
                color.lighten();
                expect(color.lightness).toBe(Math.min(originalLightness + 20, 100));
            });

            test('should lighten color by specified amount', () => {
                const color = Color.fromHex('#FF5733');
                const originalLightness = color.lightness;
                color.lighten(30);
                expect(color.lightness).toBe(Math.min(originalLightness + 30, 100));
            });

            test('should not exceed maximum lightness', () => {
                const color = Color.fromHex('#FFFFFF');
                color.lighten(50);
                expect(color.lightness).toBe(100);
            });

            test('should return the same Color instance', () => {
                const color = Color.fromHex('#FF5733');
                const result = color.lighten();
                expect(result).toBe(color);
            });

            test('should handle boundary values', () => {
                const color = Color.fromHex('#808080');
                color.lighten(0);
                expect(color.lightness).toBeCloseTo(50.2, 1);
                
                const color2 = Color.fromHex('#808080');
                color2.lighten(100);
                expect(color2.lightness).toBe(100);
            });
        });
    });

    describe('darken', () => {
        describe('validation', () => {
            test('should throw TypeError for non-number amount', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.darken('20' as any)).toThrow(TypeError);
                expect(() => color.darken(null as any)).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-number', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.darken('20' as any)).toThrow('`amount` must be a number');
            });

            test('should throw RangeError for out-of-range amount', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.darken(-1)).toThrow(RangeError);
                expect(() => color.darken(101)).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.darken(-1)).toThrow('`amount` must be between 0 and 100, inclusive');
            });
        });

        describe('functionality', () => {
            test('should darken color by default amount (20%)', () => {
                const color = Color.fromHex('#FF5733');
                const originalLightness = color.lightness;
                color.darken();
                expect(color.lightness).toBe(Math.max(originalLightness - 20, 0));
            });

            test('should darken color by specified amount', () => {
                const color = Color.fromHex('#FF5733');
                const originalLightness = color.lightness;
                color.darken(30);
                expect(color.lightness).toBe(Math.max(originalLightness - 30, 0));
            });

            test('should not go below minimum lightness', () => {
                const color = Color.fromHex('#000000');
                color.darken(50);
                expect(color.lightness).toBe(0);
            });

            test('should return the same Color instance', () => {
                const color = Color.fromHex('#FF5733');
                const result = color.darken();
                expect(result).toBe(color);
            });

            test('should handle boundary values', () => {
                const color = Color.fromHex('#808080');
                color.darken(0);
                expect(color.lightness).toBeCloseTo(50.2, 1);
                
                const color2 = Color.fromHex('#808080');
                color2.darken(100);
                expect(color2.lightness).toBe(0);
            });
        });
    });

    describe('mix', () => {
        describe('validation', () => {
            test('should throw TypeError for non-Color instance', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.mix('color' as any)).toThrow(TypeError);
                expect(() => color.mix(null as any)).toThrow(TypeError);
                expect(() => color.mix({ r: 255, g: 0, b: 0 } as any)).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-Color', () => {
                const color = Color.fromHex('#FF5733');
                expect(() => color.mix('color' as any)).toThrow('`color` must be an instance of Color');
            });

            test('should throw TypeError for non-number amount', () => {
                const color1 = Color.fromHex('#FF5733');
                const color2 = Color.fromHex('#33FF57');
                expect(() => color1.mix(color2, '50' as any)).toThrow(TypeError);
                expect(() => color1.mix(color2, null as any)).toThrow(TypeError);
            });

            test('should throw TypeError with correct message for non-number amount', () => {
                const color1 = Color.fromHex('#FF5733');
                const color2 = Color.fromHex('#33FF57');
                expect(() => color1.mix(color2, '50' as any)).toThrow('`amount` must be a number');
            });

            test('should throw RangeError for out-of-range amount', () => {
                const color1 = Color.fromHex('#FF5733');
                const color2 = Color.fromHex('#33FF57');
                expect(() => color1.mix(color2, -1)).toThrow(RangeError);
                expect(() => color1.mix(color2, 101)).toThrow(RangeError);
            });

            test('should throw RangeError with correct message for out-of-range amount', () => {
                const color1 = Color.fromHex('#FF5733');
                const color2 = Color.fromHex('#33FF57');
                expect(() => color1.mix(color2, -1)).toThrow('`amount` must be between 0 and 100, inclusive');
            });
        });

        describe('functionality', () => {
            test('should mix colors by default amount (50%)', () => {
                const color1 = Color.fromHex('#FF0000'); // Red
                const color2 = Color.fromHex('#0000FF'); // Blue
                color1.mix(color2);
                
                const rgb = color1.toRgb();
                expect(rgb.r).toBeCloseTo(128, 5);
                expect(rgb.g).toBeCloseTo(0, 5);
                expect(rgb.b).toBeCloseTo(128, 5);
            });

            test('should mix colors by specified amount', () => {
                const color1 = Color.fromHex('#FF0000'); // Red
                const color2 = Color.fromHex('#0000FF'); // Blue
                color1.mix(color2, 25);
                
                const rgb = color1.toRgb();
                expect(rgb.r).toBeCloseTo(191, 5);
                expect(rgb.g).toBeCloseTo(0, 5);
                expect(rgb.b).toBeCloseTo(64, 5);
            });

            test('should handle amount of 0 (keep original)', () => {
                const color1 = Color.fromHex('#FF5733');
                const originalRgb = color1.toRgb();
                const color2 = Color.fromHex('#33FF57');
                
                color1.mix(color2, 0);
                
                expect(color1.toRgb()).toEqual(originalRgb);
            });

            test('should handle amount of 100 (use other color)', () => {
                const color1 = Color.fromHex('#FF5733');
                const color2 = Color.fromHex('#33FF57');
                const otherRgb = color2.toRgb();
                
                color1.mix(color2, 100);
                
                expect(color1.toRgb()).toEqual(otherRgb);
            });

            test('should handle alpha channels correctly', () => {
                const color1 = Color.fromRgb({ r: 255, g: 0, b: 0, a: 1 });
                const color2 = Color.fromRgb({ r: 0, g: 0, b: 255, a: 0 });
                
                color1.mix(color2, 50);
                
                const rgb = color1.toRgb();
                expect(rgb.a).toBeCloseTo(0.5, 2);
            });

            test('should return the same Color instance', () => {
                const color1 = Color.fromHex('#FF5733');
                const color2 = Color.fromHex('#33FF57');
                const result = color1.mix(color2);
                expect(result).toBe(color1);
            });

            test('should handle mixing with transparent colors', () => {
                const color1 = Color.fromRgb({ r: 255, g: 0, b: 0, a: 0.8 });
                const color2 = Color.fromRgb({ r: 0, g: 255, b: 0, a: 0.4 });
                
                color1.mix(color2, 50);
                
                const rgb = color1.toRgb();
                expect(rgb.a).toBeCloseTo(0.6, 2);
            });
        });
    });

    describe('clone', () => {
        test('should create a new Color instance with same properties', () => {
            const original = Color.fromHex('#FF5733');
            const cloned = original.clone();
            
            expect(cloned).not.toBe(original);
            expect(cloned.toHex()).toBe(original.toHex());
            expect(cloned.hasAlphaChannel).toBe(original.hasAlphaChannel);
        });

        test('should clone color with alpha channel', () => {
            const original = Color.fromRgb({ r: 255, g: 87, b: 51, a: 0.5 });
            const cloned = original.clone();
            
            expect(cloned).not.toBe(original);
            expect(cloned.toRgb()).toEqual(original.toRgb());
            expect(cloned.hasAlphaChannel).toBe(original.hasAlphaChannel);
        });

        test('should create independent instances', () => {
            const original = Color.fromHex('#FF5733');
            const cloned = original.clone();
            
            original.lighten(20);
            
            expect(cloned.toHex()).toBe('#FF5733');
            expect(original.toHex()).not.toBe('#FF5733');
        });
    });

    describe('hasAlphaChannel getter', () => {
        test('should return false for colors without alpha', () => {
            const color = Color.fromHex('#FF5733');
            expect(color.hasAlphaChannel).toBe(false);
        });

        test('should return true for colors with alpha', () => {
            const color = Color.fromHex('#FF5733AA');
            expect(color.hasAlphaChannel).toBe(true);
        });

        test('should return true for RGB colors with alpha', () => {
            const color = Color.fromRgb({ r: 255, g: 87, b: 51, a: 0.5 });
            expect(color.hasAlphaChannel).toBe(true);
        });

        test('should return true even for zero alpha', () => {
            const color = Color.fromRgb({ r: 255, g: 87, b: 51, a: 0 });
            expect(color.hasAlphaChannel).toBe(true);
        });
    });

    describe('lightness getter', () => {
        test('should return lightness from HSL conversion', () => {
            const color = Color.fromHex('#FF5733');
            const hsl = color.toHsl();
            expect(color.lightness).toBe(hsl.l);
        });

        test('should return 0 for pure black', () => {
            const color = Color.fromHex('#000000');
            expect(color.lightness).toBe(0);
        });

        test('should return 100 for pure white', () => {
            const color = Color.fromHex('#FFFFFF');
            expect(color.lightness).toBe(100);
        });

        test('should return approximately 50 for medium gray', () => {
            const color = Color.fromHex('#808080');
            expect(color.lightness).toBeCloseTo(50.2, 1);
        });
    });

    describe('isLight getter', () => {
        test('should return true for light colors', () => {
            const white = Color.fromHex('#FFFFFF');
            const lightGray = Color.fromHex('#CCCCCC');
            const yellow = Color.fromHex('#FFFF00');
            
            expect(white.isLight).toBe(true);
            expect(lightGray.isLight).toBe(true);
            expect(yellow.isLight).toBe(true);
        });

        test('should return false for dark colors', () => {
            const black = Color.fromHex('#000000');
            const darkGray = Color.fromHex('#333333');
            const darkBlue = Color.fromHex('#000080');
            
            expect(black.isLight).toBe(false);
            expect(darkGray.isLight).toBe(false);
            expect(darkBlue.isLight).toBe(false);
        });

        test('should return true for colors with lightness >= 50', () => {
            const color = Color.fromHsl({ h: 0, s: 0, l: 50 });
            expect(color.isLight).toBe(true);
        });

        test('should return false for colors with lightness < 50', () => {
            const color = Color.fromHsl({ h: 0, s: 0, l: 49.9 });
            expect(color.isLight).toBe(false);
        });
    });

    describe('isDark getter', () => {
        test('should return false for light colors', () => {
            const white = Color.fromHex('#FFFFFF');
            const lightGray = Color.fromHex('#CCCCCC');
            const yellow = Color.fromHex('#FFFF00');
            
            expect(white.isDark).toBe(false);
            expect(lightGray.isDark).toBe(false);
            expect(yellow.isDark).toBe(false);
        });

        test('should return true for dark colors', () => {
            const black = Color.fromHex('#000000');
            const darkGray = Color.fromHex('#333333');
            const darkBlue = Color.fromHex('#000080');
            
            expect(black.isDark).toBe(true);
            expect(darkGray.isDark).toBe(true);
            expect(darkBlue.isDark).toBe(true);
        });

        test('should be opposite of isLight', () => {
            const colors = [
                Color.fromHex('#FFFFFF'),
                Color.fromHex('#808080'),
                Color.fromHex('#000000'),
                Color.fromHex('#FF5733'),
                Color.fromHex('#33FF57')
            ];
            
            colors.forEach(color => {
                expect(color.isDark).toBe(!color.isLight);
            });
        });
    });

    describe('valueOf', () => {
        test('should return decimal representation', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(color.valueOf()).toBe(0xFF5733);
        });

        test('should return same value as toDecimal()', () => {
            const color = Color.fromHex('#FF5733');
            expect(color.valueOf()).toBe(color.toDecimal());
        });

        test('should work with alpha channel', () => {
            const color = Color.fromDecimal(0xAAFF5733, true);
            expect(color.valueOf()).toBe(0xAAFF5733);
        });

        test('should allow numeric operations', () => {
            const color = Color.fromDecimal(100);
            expect(+color).toBe(100);
            expect(Number(color)).toBe(100);
        });
    });

    describe('toString', () => {
        test('should return hexadecimal representation', () => {
            const color = Color.fromRgb({ r: 255, g: 87, b: 51 });
            expect(color.toString()).toBe('#FF5733');
        });

        test('should be same as toHex()', () => {
            const color = Color.fromDecimal(0xFF5733);
            expect(color.toString()).toBe(color.toHex());
        });

        test('should work with alpha channel', () => {
            const color = Color.fromRgb({ r: 255, g: 87, b: 51, a: 1 });
            expect(color.toString()).toBe('#FFFF5733');
        });

        test('should work in string concatenation', () => {
            const color = Color.fromHex('#FF5733');
            expect(`Color: ${color}`).toBe('Color: #FF5733');
        });
    });

    describe('toJSON', () => {
        test('should return complete color representation', () => {
            const color = Color.fromHex('#FF5733');
            const json = color.toJSON();
            
            expect(json).toHaveProperty('decimal');
            expect(json).toHaveProperty('hex');
            expect(json).toHaveProperty('rgb');
            expect(json).toHaveProperty('hsl');
            expect(json).toHaveProperty('cmyk');
            
            expect(json.decimal).toBe(color.toDecimal());
            expect(json.hex).toBe(color.toHex());
            expect(json.rgb).toEqual(color.toRgb());
            expect(json.hsl).toEqual(color.toHsl());
            expect(json.cmyk).toEqual(color.toCmyk());
        });

        test('should work with alpha channel', () => {
            const color = Color.fromRgb({ r: 255, g: 87, b: 51, a: 0.5 });
            const json = color.toJSON();
            
            expect(json.rgb.a).toBeCloseTo(0.5, 2);
            expect(json.hsl.a).toBeCloseTo(0.5, 2);
        });

        test('should be serializable to JSON string', () => {
            const color = Color.fromHex('#FF5733');
            const jsonString = JSON.stringify(color);
            const parsed = JSON.parse(jsonString);
            
            expect(parsed.hex).toBe('#FF5733');
            expect(parsed.rgb.r).toBe(255);
            expect(parsed.rgb.g).toBe(87);
            expect(parsed.rgb.b).toBe(51);
        });

        test('should maintain precision in all formats', () => {
            const color = Color.fromRgb({ r: 128, g: 64, b: 192 });
            const json = color.toJSON();
            
            // Verify round-trip consistency
            const recreated = Color.fromRgb(json.rgb);
            expect(recreated.toRgb()).toEqual(color.toRgb());
        });
    });

    describe('method chaining and immutability concerns', () => {
        test('lighten and darken should modify the instance', () => {
            const color = Color.fromHex('#FF5733');
            const originalHex = color.toHex();
            
            const result = color.lighten(10);
            expect(result).toBe(color);
            expect(color.toHex()).not.toBe(originalHex);
        });

        test('mix should modify the instance', () => {
            const color1 = Color.fromHex('#FF5733');
            const color2 = Color.fromHex('#33FF57');
            const originalHex = color1.toHex();
            
            const result = color1.mix(color2);
            expect(result).toBe(color1);
            expect(color1.toHex()).not.toBe(originalHex);
        });

        test('clone should create independent copy', () => {
            const original = Color.fromHex('#FF5733');
            const cloned = original.clone();
            
            original.lighten(20);
            cloned.darken(20);
            
            expect(original.toHex()).not.toBe(cloned.toHex());
        });

        test('should support method chaining', () => {
            const color = Color.fromHex('#FF5733');
            const result = color.lighten(10).darken(5);
            
            expect(result).toBe(color);
            expect(typeof result.toHex()).toBe('string');
        });
    });
});
