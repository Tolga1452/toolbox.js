import { convertToHex } from '../';

describe('convertToHex', () => {
    it('should convert decimal color code to hexadecimal color code', () => {
        expect(convertToHex(16711680)).toEqual('#ff0000');
    });

    it('should convert RGB color code to hexadecimal color code', () => {
        expect(convertToHex([255, 0, 0])).toEqual('#ff0000');
    });
});