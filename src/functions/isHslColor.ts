import { HSL } from '../types/color.js';

/**
 * Checks if a value is a valid HSL color object.
 * 
 * This function checks if the provided value is an object with properties `h`, `s`, and `l` that are integers within the specified ranges:
 * - `h` (hue) should be an integer between 0 and 360
 * - `s` (saturation) should be an integer between 0 and 100
 * - `l` (lightness) should be an integer between 0 and 100
 * 
 * * It also optionally checks for an `a` property, which should be a number between 0 and 1 if it exists.
 * 
 * @param value - The value to check.
 * @returns True if the value is a valid HSL color object, false otherwise.
 * 
 * @example
 * isHslColor({ h: 360, s: 100, l: 50 }); // true
 * 
 * @example
 * isHslColor({ h: 180, s: 50, l: 25, a: 0.5 }); // true
 * 
 * @example
 * isHslColor({ h: 361, s: 50, l: 50 }); // false
 * 
 * @example
 * isHslColor("#ff0000"); // false
 */
export function isHslColor(value: any): value is HSL {
    return typeof value === 'object' &&
        value !== null && // i love javascript
        Number.isInteger(value.h) &&
        Number.isInteger(value.s) &&
        Number.isInteger(value.l) &&
        value.h >= 0 && value.h <= 360 &&
        value.s >= 0 && value.s <= 100 &&
        value.l >= 0 && value.l <= 100 &&
        (value.a === undefined || (typeof value.a === 'number' && value.a >= 0 && value.a <= 1));
};
