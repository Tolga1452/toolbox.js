import { CMYK } from '../types/color.js';

/**
 * Checks if a value is a valid CMYK color object.
 * 
 * This function checks if the provided value is an object with properties `c`, `m`, `y`, and `k` that are integers within the specified ranges:
 * - `c` (cyan) should be an integer between 0 and 100
 * - `m` (magenta) should be an integer between 0 and 100
 * - `y` (yellow) should be an integer between 0 and 100
 * - `k` (black) should be an integer between 0 and 100
 * 
 * @param value - The value to check.
 * @returns True if the value is a valid CMYK color object, false otherwise.
 * 
 * @example
 * isCmykColor({ c: 0, m: 100, y: 100, k: 0 }); // true
 * 
 * @example
 * isCmykColor({ c: 50, m: 50, y: 50, k: 50 }); // true
 * 
 * @example
 * isCmykColor({ c: 101, m: 50, y: 50, k: 50 }); // false
 * 
 * @example
 * isCmykColor("#ff0000"); // false
 */
export function isCmykColor(value: any): value is CMYK {
    return typeof value === 'object' &&
        Number.isInteger(value.c) &&
        Number.isInteger(value.m) &&
        Number.isInteger(value.y) &&
        Number.isInteger(value.k) &&
        value.c >= 0 && value.c <= 100 &&
        value.m >= 0 && value.m <= 100 &&
        value.y >= 0 && value.y <= 100 &&
        value.k >= 0 && value.k <= 100;
};
