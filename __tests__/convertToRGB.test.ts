import { convertToRGB } from '../';

describe('convertToRGB', () => {
    it('should convert decimal color code to RGB color code', () => {
        expect(convertToRGB(16711680)).toEqual([255, 0, 0]);
    });

    it('should convert hexadecimal color code to RGB color code', () => {
        expect(convertToRGB('#ff0000')).toEqual([255, 0, 0]);
    });
});