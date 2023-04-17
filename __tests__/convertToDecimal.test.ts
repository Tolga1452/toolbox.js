import { convertToDecimal } from '../';

describe('convertToDecimal', () => {
    it('should convert RGB color code to decimal color code', () => {
        expect(convertToDecimal([0, 0, 0])).toEqual(0);
        expect(convertToDecimal([255, 255, 255])).toEqual(16777215);
        expect(convertToDecimal([128, 128, 128])).toEqual(8421504);
    });

    it('should convert hexadecimal color code to decimal color code', () => {
        expect(convertToDecimal('#000000')).toEqual(0);
        expect(convertToDecimal('#ffffff')).toEqual(16777215);
        expect(convertToDecimal('#808080')).toEqual(8421504);
    });
});