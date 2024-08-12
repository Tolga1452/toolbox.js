import { convertToRgb } from '../';

describe('convertToRgb', () => {
    it('should convert decimal color code to RGB color code', () => {
        expect(convertToRgb(16711680)).toEqual([255, 0, 0]);
    });

    it('should convert hexadecimal color code to RGB color code', () => {
        expect(convertToRgb('#ff0000')).toEqual([255, 0, 0]);
    });
});