import { AnyColor } from '../types/color.js';
import { isCmykColor } from './isCmykColor.js';
import { isDecimalColor } from './isDecimalColor.js';
import { isHexColor } from './isHexColor.js';
import { isHslColor } from './isHslColor.js';
import { isRgbColor } from './isRgbColor.js';

/**
 * Checks if the given value is a valid color.
 * 
 * To check for specific color types, use one of these instead: `isDecimalColor`, `isHexColor`, `isRgbColor`, `isHslColor`, or `isCmykColor`.
 *
 * @param value - The value to check.
 * @returns True if the value is a valid color, false otherwise.
 * 
 * @example
 * isColor('#ff0000'); // true
 * isColor({ r: 255, g: 0, b: 0 }); // true
 * isColor('not a color'); // false
 */
export function isColor(value: any): value is AnyColor {
    return isDecimalColor(value) ||
        isHexColor(value) ||
        isRgbColor(value) ||
        isHslColor(value) ||
        isCmykColor(value);
};
