import { links } from '../src/functions';

describe('links', () => {
    describe('type validation', () => {
        test('should throw TypeError for non-string input', () => {
            expect(() => links(123 as any)).toThrow(TypeError);
            expect(() => links(null as any)).toThrow(TypeError);
            expect(() => links(undefined as any)).toThrow(TypeError);
            expect(() => links({} as any)).toThrow(TypeError);
            expect(() => links([] as any)).toThrow(TypeError);
        });

        test('should throw TypeError with correct message', () => {
            expect(() => links(123 as any)).toThrow('`str` must be a string');
        });
    });

    describe('basic functionality', () => {
        test('should extract single HTTP link', () => {
            const result = links('Visit http://example.com for more info');
            expect(result).toEqual(['http://example.com']);
        });

        test('should extract single HTTPS link', () => {
            const result = links('Check out my website: https://www.example.com');
            expect(result).toEqual(['https://www.example.com']);
        });

        test('should extract multiple links', () => {
            const result = links('Visit https://google.com and http://github.com');
            expect(result).toEqual(['https://google.com', 'http://github.com']);
        });

        test('should return empty array for string with no links', () => {
            const result = links('This is just plain text with no links');
            expect(result).toEqual([]);
        });

        test('should return empty array for empty string', () => {
            const result = links('');
            expect(result).toEqual([]);
        });
    });

    describe('punctuation handling', () => {
        test('should exclude trailing punctuation', () => {
            expect(links('Visit https://example.com.')).toEqual(['https://example.com']);
            expect(links('Visit https://example.com,')).toEqual(['https://example.com']);
            expect(links('Visit https://example.com;')).toEqual(['https://example.com']);
            expect(links('Visit https://example.com:')).toEqual(['https://example.com']);
            expect(links('Visit https://example.com!')).toEqual(['https://example.com']);
            expect(links('Visit https://example.com?')).toEqual(['https://example.com']);
            expect(links('Visit https://example.com)')).toEqual(['https://example.com']);
        });

        test('should handle links in parentheses', () => {
            const result = links('Check this out (https://example.com)');
            expect(result).toEqual(['https://example.com']);
        });
    });

    describe('whitespace handling', () => {
        test('should handle links with surrounding whitespace', () => {
            const result = links('   https://example.com   ');
            expect(result).toEqual(['https://example.com']);
        });

        test('should handle links separated by whitespace', () => {
            const result = links('https://google.com\t\nhttps://github.com');
            expect(result).toEqual(['https://google.com', 'https://github.com']);
        });
    });

    describe('complex URLs', () => {
        test('should handle URLs with paths', () => {
            const result = links('Visit https://example.com/path/to/page');
            expect(result).toEqual(['https://example.com/path/to/page']);
        });

        test('should handle URLs with query parameters', () => {
            const result = links('Search https://google.com/search?q=test');
            expect(result).toEqual(['https://google.com/search?q=test']);
        });

        test('should handle URLs with fragments', () => {
            const result = links('Go to https://example.com/page#section');
            expect(result).toEqual(['https://example.com/page#section']);
        });

        test('should handle URLs with ports', () => {
            const result = links('Local server http://localhost:3000');
            expect(result).toEqual(['http://localhost:3000']);
        });
    });

    describe('edge cases', () => {
        test('should handle malformed URLs gracefully', () => {
            const result = links('This has http:// incomplete and https:// also incomplete');
            expect(result).toEqual([]);
        });

        test('should handle mixed content', () => {
            const text = 'Check out https://github.com for code, https://google.com for search, and visit http://stackoverflow.com for help!';
            const result = links(text);
            expect(result).toEqual([
                'https://github.com',
                'https://google.com',
                'http://stackoverflow.com'
            ]);
        });

        test('should handle string with only whitespace', () => {
            const result = links('   \t\n   ');
            expect(result).toEqual([]);
        });
    });
});
