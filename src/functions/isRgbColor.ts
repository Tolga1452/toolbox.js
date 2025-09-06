import { RGB } from '../types/color.js';

/**
 * Checks if a value is a valid RGB color object.
 * 
 * This function checks if the provided value is an object with properties `r`, `g`, and `b` that are integers within the specified ranges:
 * - `r` (red) should be an integer between 0 and 255
 * - `g` (green) should be an integer between 0 and 255
 * - `b` (blue) should be an integer between 0 and 255
 * 
 * * It also optionally checks for an `a` property, which should be a number between 0 and 1 if it exists.
 * 
 * @param value - The value to check.
 * @returns True if the value is a valid RGB color object, false otherwise.
 * 
 * @example
 * isRgbColor({ r: 255, g: 0, b: 0 }); // true
 * 
 * @example
 * isRgbColor({ r: 255, g: 0, b: 0, a: 1 }); // true
 * 
 * @example
 * isRgbColor({ r: 256, g: 0, b: 0 }); // false
 * 
 * @example
 * isRgbColor("#ff0000"); // false
 */
export function isRgbColor(value: any): value is RGB {
    return typeof value === 'object' &&
        value !== null && // i love javascript
        Number.isInteger(value.r) &&
        Number.isInteger(value.g) &&
        Number.isInteger(value.b) &&
        value.r >= 0 && value.r <= 255 &&
        value.g >= 0 && value.g <= 255 &&
        value.b >= 0 && value.b <= 255 &&
        (value.a === undefined || (typeof value.a === 'number' && value.a >= 0 && value.a <= 1));
};
