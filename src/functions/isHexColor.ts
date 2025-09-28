import { Hexadecimal } from '../types/color.js';
import { HEX_FORMAT } from '../utils/constants.js';

/**
 * Checks if a value is a valid hexadecimal color string.
 * A valid hex color can be in the format #RRGGBB, #RGB, #RRGGBBAA, or #RGBA.
 * 
 * @param value - The value to check.
 * @returns True if the value is a valid hexadecimal color, false otherwise.
 * 
 * @example
 * isHexColor('#ff0000'); // true
 * 
 * @example
 * isHexColor({ r: 255, g: 0, b: 0 }); // false
 */
export function isHexColor(value: any): value is Hexadecimal {
    return typeof value === 'string' && HEX_FORMAT.test(value);
};
