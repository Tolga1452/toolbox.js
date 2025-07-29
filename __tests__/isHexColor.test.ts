import { isHexColor } from '../src/functions/isHexColor';

describe('isHexColor', () => {
    describe('valid hex colors', () => {
        test('should return true for 3-digit hex colors (#RGB)', () => {
            expect(isHexColor('#000')).toBe(true);
            expect(isHexColor('#fff')).toBe(true);
            expect(isHexColor('#F00')).toBe(true);
            expect(isHexColor('#0F0')).toBe(true);
            expect(isHexColor('#00F')).toBe(true);
            expect(isHexColor('#123')).toBe(true);
            expect(isHexColor('#abc')).toBe(true);
            expect(isHexColor('#DEF')).toBe(true);
        });

        test('should return true for 6-digit hex colors (#RRGGBB)', () => {
            expect(isHexColor('#000000')).toBe(true);
            expect(isHexColor('#ffffff')).toBe(true);
            expect(isHexColor('#FF0000')).toBe(true);
            expect(isHexColor('#00FF00')).toBe(true);
            expect(isHexColor('#0000FF')).toBe(true);
            expect(isHexColor('#123456')).toBe(true);
            expect(isHexColor('#abcdef')).toBe(true);
            expect(isHexColor('#ABCDEF')).toBe(true);
            expect(isHexColor('#987654')).toBe(true);
        });

        test('should return true for 4-digit hex colors with alpha (#RGBA)', () => {
            expect(isHexColor('#0000')).toBe(true);
            expect(isHexColor('#ffff')).toBe(true);
            expect(isHexColor('#F00A')).toBe(true);
            expect(isHexColor('#0F0B')).toBe(true);
            expect(isHexColor('#00FC')).toBe(true);
            expect(isHexColor('#123D')).toBe(true);
            expect(isHexColor('#abcE')).toBe(true);
            expect(isHexColor('#DEFF')).toBe(true);
        });

        test('should return true for 8-digit hex colors with alpha (#RRGGBBAA)', () => {
            expect(isHexColor('#00000000')).toBe(true);
            expect(isHexColor('#ffffffff')).toBe(true);
            expect(isHexColor('#FF0000FF')).toBe(true);
            expect(isHexColor('#00FF00AA')).toBe(true);
            expect(isHexColor('#0000FFBB')).toBe(true);
            expect(isHexColor('#12345678')).toBe(true);
            expect(isHexColor('#abcdef90')).toBe(true);
            expect(isHexColor('#ABCDEF12')).toBe(true);
            expect(isHexColor('#98765432')).toBe(true);
        });

        test('should return true for mixed case hex colors', () => {
            expect(isHexColor('#AbC')).toBe(true);
            expect(isHexColor('#aBcDeF')).toBe(true);
            expect(isHexColor('#FfAa99')).toBe(true);
            expect(isHexColor('#1A2b3C')).toBe(true);
            expect(isHexColor('#DeAdBeEf')).toBe(true);
        });
    });

    describe('invalid hex colors - malformed strings', () => {
        test('should return false for hex strings without # prefix', () => {
            expect(isHexColor('000')).toBe(false);
            expect(isHexColor('ffffff')).toBe(false);
            expect(isHexColor('FF0000')).toBe(false);
            expect(isHexColor('abc')).toBe(false);
            expect(isHexColor('123456')).toBe(false);
        });

        test('should return false for wrong length hex strings', () => {
            expect(isHexColor('#')).toBe(false);
            expect(isHexColor('#0')).toBe(false);
            expect(isHexColor('#00')).toBe(false);
            expect(isHexColor('#00000')).toBe(false);
            expect(isHexColor('#0000000')).toBe(false);
            expect(isHexColor('#000000000')).toBe(false);
            expect(isHexColor('#0123456789')).toBe(false);
        });

        test('should return false for hex strings with invalid characters', () => {
            expect(isHexColor('#GGG')).toBe(false);
            expect(isHexColor('#GGGGGG')).toBe(false);
            expect(isHexColor('#12G456')).toBe(false);
            expect(isHexColor('#123Z56')).toBe(false);
            expect(isHexColor('#ff00xx')).toBe(false);
            expect(isHexColor('#HELLO!')).toBe(false);
            expect(isHexColor('#12@456')).toBe(false);
            expect(isHexColor('#ff ff')).toBe(false);
        });

        test('should return false for multiple # symbols', () => {
            expect(isHexColor('##000')).toBe(false);
            expect(isHexColor('#00#000')).toBe(false);
            expect(isHexColor('#000##0')).toBe(false);
            expect(isHexColor('###fff')).toBe(false);
        });

        test('should return false for hex strings with special characters', () => {
            expect(isHexColor('#000-000')).toBe(false);
            expect(isHexColor('#000_000')).toBe(false);
            expect(isHexColor('#000.000')).toBe(false);
            expect(isHexColor('#000+000')).toBe(false);
            expect(isHexColor('#000 000')).toBe(false);
            expect(isHexColor('#000\n000')).toBe(false);
            expect(isHexColor('#000\t000')).toBe(false);
        });
    });

    describe('type validation', () => {
        test('should return false for number values', () => {
            expect(isHexColor(0)).toBe(false);
            expect(isHexColor(255)).toBe(false);
            expect(isHexColor(16777215)).toBe(false);
            expect(isHexColor(0xFF0000)).toBe(false);
            expect(isHexColor(-1)).toBe(false);
            expect(isHexColor(1.5)).toBe(false);
            expect(isHexColor(NaN)).toBe(false);
            expect(isHexColor(Infinity)).toBe(false);
            expect(isHexColor(-Infinity)).toBe(false);
        });

        test('should return false for boolean values', () => {
            expect(isHexColor(true)).toBe(false);
            expect(isHexColor(false)).toBe(false);
        });

        test('should return false for null and undefined', () => {
            expect(isHexColor(null)).toBe(false);
            expect(isHexColor(undefined)).toBe(false);
        });

        test('should return false for objects', () => {
            expect(isHexColor({})).toBe(false);
            expect(isHexColor({ color: '#ff0000' })).toBe(false);
            expect(isHexColor({ r: 255, g: 0, b: 0 })).toBe(false);
            expect(isHexColor(new Date())).toBe(false);
            expect(isHexColor(/regex/)).toBe(false);
            expect(isHexColor(new Error())).toBe(false);
        });

        test('should return false for arrays', () => {
            expect(isHexColor([])).toBe(false);
            expect(isHexColor(['#ff0000'])).toBe(false);
            expect(isHexColor([255, 0, 0])).toBe(false);
            expect(isHexColor(['#', 'f', 'f', '0', '0', '0', '0'])).toBe(false);
        });

        test('should return false for functions', () => {
            expect(isHexColor(() => '#ff0000')).toBe(false);
            expect(isHexColor(function() { return '#000000'; })).toBe(false);
            expect(isHexColor(isHexColor)).toBe(false);
        });

        test('should return false for symbols', () => {
            expect(isHexColor(Symbol('color'))).toBe(false);
            expect(isHexColor(Symbol('#ff0000'))).toBe(false);
        });
    });

    describe('edge cases', () => {
        test('should return false for empty string', () => {
            expect(isHexColor('')).toBe(false);
        });

        test('should return false for whitespace strings', () => {
            expect(isHexColor(' ')).toBe(false);
            expect(isHexColor('\t')).toBe(false);
            expect(isHexColor('\n')).toBe(false);
            expect(isHexColor('   ')).toBe(false);
        });

        test('should return false for strings with leading/trailing whitespace', () => {
            expect(isHexColor(' #ff0000')).toBe(false);
            expect(isHexColor('#ff0000 ')).toBe(false);
            expect(isHexColor(' #ff0000 ')).toBe(false);
            expect(isHexColor('\t#ff0000\n')).toBe(false);
        });

        test('should handle String constructor results', () => {
            expect(isHexColor(String('#ff0000'))).toBe(true);
            expect(isHexColor(String('#fff'))).toBe(true);
            expect(isHexColor(String('invalid'))).toBe(false);
            expect(isHexColor(String(123))).toBe(false);
        });

        test('should handle toString() results', () => {
            expect(isHexColor({ toString: () => '#ff0000' }.toString())).toBe(true);
            expect(isHexColor({ toString: () => 'invalid' }.toString())).toBe(false);
        });

        test('should handle concatenated strings', () => {
            expect(isHexColor('#' + 'ff0000')).toBe(true);
            expect(isHexColor('#' + 'fff')).toBe(true);
            expect(isHexColor('# ' + 'ff0000')).toBe(false);
        });
    });

    describe('type guard functionality', () => {
        test('should work as a type guard in conditional blocks', () => {
            const value: any = '#ff0000';
            
            if (isHexColor(value)) {
                // In this block, TypeScript should know value is Hexadecimal
                expect(typeof value).toBe('string');
                expect(value.startsWith('#')).toBe(true);
            }
        });

        test('should filter arrays correctly when used as type guard', () => {
            const mixedArray: any[] = [
                '#ff0000',
                '#fff',
                '#12345678',
                'red',
                16777215,
                '#gggggg',
                '#',
                null,
                '#0000FF',
                '#invalid',
                '#123'
            ];
            
            const validColors = mixedArray.filter(isHexColor);
            
            expect(validColors).toEqual(['#ff0000', '#fff', '#12345678', '#0000FF', '#123']);
            expect(validColors.length).toBe(5);
        });

        test('should work with array methods that use type guards', () => {
            const testArray: any[] = ['#ff0000', 123, '#00ff00', null, '#blue'];
            
            const hexColors = testArray.filter(isHexColor);
            expect(hexColors).toEqual(['#ff0000', '#00ff00']);
            
            const hasValidHex = testArray.some(isHexColor);
            expect(hasValidHex).toBe(true);
            
            const allValidHex = testArray.every(isHexColor);
            expect(allValidHex).toBe(false);
        });
    });

    describe('common color values', () => {
        test('should validate standard web colors in hex format', () => {
            expect(isHexColor('#000000')).toBe(true); // black
            expect(isHexColor('#ffffff')).toBe(true); // white
            expect(isHexColor('#ff0000')).toBe(true); // red
            expect(isHexColor('#00ff00')).toBe(true); // lime
            expect(isHexColor('#0000ff')).toBe(true); // blue
            expect(isHexColor('#ffff00')).toBe(true); // yellow
            expect(isHexColor('#ff00ff')).toBe(true); // magenta
            expect(isHexColor('#00ffff')).toBe(true); // cyan
        });

        test('should validate standard web colors in short hex format', () => {
            expect(isHexColor('#000')).toBe(true); // black
            expect(isHexColor('#fff')).toBe(true); // white
            expect(isHexColor('#f00')).toBe(true); // red
            expect(isHexColor('#0f0')).toBe(true); // lime
            expect(isHexColor('#00f')).toBe(true); // blue
            expect(isHexColor('#ff0')).toBe(true); // yellow
            expect(isHexColor('#f0f')).toBe(true); // magenta
            expect(isHexColor('#0ff')).toBe(true); // cyan
        });

        test('should validate grayscale values', () => {
            expect(isHexColor('#808080')).toBe(true); // gray
            expect(isHexColor('#c0c0c0')).toBe(true); // silver
            expect(isHexColor('#404040')).toBe(true); // dark gray
            expect(isHexColor('#f0f0f0')).toBe(true); // light gray
            expect(isHexColor('#888')).toBe(true); // gray (short)
            expect(isHexColor('#ccc')).toBe(true); // silver (short)
        });

        test('should validate colors with alpha channel', () => {
            expect(isHexColor('#ff000080')).toBe(true); // red with 50% alpha
            expect(isHexColor('#00ff0040')).toBe(true); // green with 25% alpha
            expect(isHexColor('#0000ffff')).toBe(true); // blue with 100% alpha
            expect(isHexColor('#f008')).toBe(true); // red with alpha (short)
            expect(isHexColor('#0f04')).toBe(true); // green with alpha (short)
        });
    });

    describe('performance edge cases', () => {
        test('should handle repeated calls with same values efficiently', () => {
            const testValue = '#ff0000';
            
            for (let i = 0; i < 100; i++) {
                expect(isHexColor(testValue)).toBe(true);
            }
        });

        test('should handle batch validation of mixed types', () => {
            const testValues = [
                '#ff0000', '#fff', '#12345678', 'red', 16777215,
                '#gggggg', '#', null, undefined, {},
                [], true, false, '#0000FF', '#invalid'
            ];
            
            const expectedResults = [
                true, true, true, false, false,
                false, false, false, false, false,
                false, false, false, true, false
            ];
            
            testValues.forEach((value, index) => {
                expect(isHexColor(value)).toBe(expectedResults[index]);
            });
        });

        test('should handle very long invalid strings efficiently', () => {
            const longInvalidString = '#' + 'f'.repeat(1000);
            expect(isHexColor(longInvalidString)).toBe(false);
            
            const longInvalidStringNoHash = 'f'.repeat(1000);
            expect(isHexColor(longInvalidStringNoHash)).toBe(false);
        });

        test('should handle complex invalid patterns', () => {
            const complexInvalid = [
                '#ff00gg',
                '#123xyz',
                '#!@#$%^',
                '#ff\n00',
                '#ff\t00',
                '#ff 00',
                '#ff-00',
                '#ff_00',
                '#ff.00'
            ];
            
            complexInvalid.forEach(value => {
                expect(isHexColor(value)).toBe(false);
            });
        });
    });

    describe('boundary conditions', () => {
        test('should handle hex values at format boundaries', () => {
            // Exactly 3 digits
            expect(isHexColor('#000')).toBe(true);
            expect(isHexColor('#fff')).toBe(true);
            
            // Exactly 4 digits  
            expect(isHexColor('#0000')).toBe(true);
            expect(isHexColor('#ffff')).toBe(true);
            
            // Exactly 6 digits
            expect(isHexColor('#000000')).toBe(true);
            expect(isHexColor('#ffffff')).toBe(true);
            
            // Exactly 8 digits
            expect(isHexColor('#00000000')).toBe(true);
            expect(isHexColor('#ffffffff')).toBe(true);
        });

        test('should handle all valid hex characters', () => {
            const validChars = '0123456789abcdefABCDEF';
            
            // Test each character in a valid context
            for (const char of validChars) {
                expect(isHexColor(`#${char}${char}${char}`)).toBe(true);
                expect(isHexColor(`#${char}${char}${char}${char}${char}${char}`)).toBe(true);
            }
        });

        test('should reject all invalid hex characters', () => {
            const invalidChars = 'ghijklmnopqrstuvwxyzGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
            
            // Test each invalid character
            for (const char of invalidChars) {
                expect(isHexColor(`#${char}00`)).toBe(false);
                expect(isHexColor(`#0${char}0`)).toBe(false);
                expect(isHexColor(`#00${char}`)).toBe(false);
            }
        });
    });
});