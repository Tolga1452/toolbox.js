import { Link } from '../types/functions.js';

/**
 * Extracts all HTTP/HTTPS links from a given string.
 * 
 * @param str - The input string to search for links.
 * @returns An array of extracted links.
 * 
 * @example
 * links("Check out https://example.com and http://test.com."); // ["https://example.com", "http://test.com"]
 */
export function links(str: string): Link[] {
    if (typeof str !== 'string') throw new TypeError('`str` must be a string');

    const regex = /\bhttps?:\/\/(?:[^\s<>"'(){}[\]]+|\([^\s<>"'(){}[\]]+\))+(?<![.,!?;:])/gi;
    const matches = Array.from(str.matchAll(regex)).map(m => m[0] as Link);

    return matches;
};
