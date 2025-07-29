/**
 * Returns the links of the given string.
 * @param str The string to get the links from.
 * @returns The links found in the string.
 * 
 * @example
 * links("Check out my website: https://www.example.com"); // ["https://www.example.com"]
 */
export function links(str: string): string[] {
    if (typeof str !== 'string') throw new TypeError('`str` must be a string');

    const regex = /https?:\/\/[^\s]+[^\s.,;:!?)]/g;

    return str.match(regex) || [];
};
