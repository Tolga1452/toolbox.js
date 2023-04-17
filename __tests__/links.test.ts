import { links } from '../';

describe('links', () => {
    it('should return the links of the given string', () => {
        const str = 'Check out my website: https://www.example.com';
        const expected = ['https://www.example.com'];

        expect(links(str)).toEqual(expected);
    });

    it('should return an empty array if given string has no links', () => {
        const str = 'This is a test string with no links';

        expect(links(str)).toEqual([]);
    });

    it('should return all links in the string', () => {
        const str = 'Here are three links: https://www.example.com https://www.google.com https://www.github.com';
        const expected = ['https://www.example.com', 'https://www.google.com', 'https://www.github.com'];

        expect(links(str)).toEqual(expected);
    });

    it('should handle multiple links in the same sentence', () => {
        const str = 'Check out my website: https://www.example.com, and my Github: https://www.github.com';
        const expected = ['https://www.example.com', 'https://www.github.com'];

        expect(links(str)).toEqual(expected);
    });

    it('should work with URLs that have query parameters', () => {
        const str = 'Here is a link with query parameters: https://www.example.com/?id=123&name=John';
        const expected = ['https://www.example.com/?id=123&name=John'];

        expect(links(str)).toEqual(expected);
    });
});