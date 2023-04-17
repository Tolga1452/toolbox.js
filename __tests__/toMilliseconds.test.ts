import { toMilliseconds, TimeUnit } from '../';

describe('TimeUtils', () => {
    it('should convert time in seconds to milliseconds', () => {
        const result = toMilliseconds(1, TimeUnit.Seconds);

        expect(result).toBe(1000);
    });

    it('should convert time in minutes to milliseconds', () => {
        const result = toMilliseconds(2, TimeUnit.Minutes);

        expect(result).toBe(120000);
    });

    it('should convert time in hours to milliseconds', () => {
        const result = toMilliseconds(3, TimeUnit.Hours);

        expect(result).toBe(10800000);
    });

    it('should convert time in days to milliseconds', () => {
        const result = toMilliseconds(4, TimeUnit.Days);

        expect(result).toBe(345600000);
    });

    it('should convert time in weeks to milliseconds', () => {
        const result = toMilliseconds(1, TimeUnit.Weeks);

        expect(result).toBe(604800000);
    });

    it('should convert time in months to milliseconds', () => {
        const result = toMilliseconds(1, TimeUnit.Months);

        expect(result).toBe(2629800000);
    });

    it('should convert time in years to milliseconds', () => {
        const result = toMilliseconds(1, TimeUnit.Years);

        expect(result).toBe(31557600000);
    });

    it('should return the time in milliseconds if the unit is milliseconds', () => {
        const result = toMilliseconds(500, TimeUnit.Milliseconds);

        expect(result).toBe(500);
    });
});