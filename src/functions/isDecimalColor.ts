import { Decimal } from '../types/color.js';

/**
 * Checks if a value is a valid decimal color.
 * A valid decimal color is an integer between 0 and 0xFFFFFFFF (inclusive).
 * 
 * @param value - The value to check.
 * @returns True if the value is a valid decimal color, false otherwise.
 * 
 * @example
 * isDecimalColor(16777215); // true
 * 
 * @example
 * isDecimalColor("#FFFFFF"); // false
 */
export function isDecimalColor(value: any): value is Decimal {
    return Number.isInteger(value) && value >= 0 && value <= 0xFFFFFFFF;
};
