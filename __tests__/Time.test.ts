import { Time } from '../src/classes';
import { TimeUnit } from '../src/types';

describe('Time', () => {
    describe('constructor validation', () => {
        test('should throw TypeError for non-number time parameter', () => {
            expect(() => new Time('not a number' as any)).toThrow(TypeError);
            expect(() => new Time(null as any)).toThrow(TypeError);
            expect(() => new Time(undefined as any)).toThrow(TypeError);
            expect(() => new Time({} as any)).toThrow(TypeError);
            expect(() => new Time([] as any)).toThrow(TypeError);
            expect(() => new Time(true as any)).toThrow(TypeError);
        });

        test('should accept Time instances as valid input', () => {
            const originalTime = new Time(5000);
            expect(() => new Time(originalTime)).not.toThrow();
            
            const copiedTime = new Time(originalTime);
            expect(copiedTime).toBeInstanceOf(Time);
            expect(copiedTime.ms).toBe(5000);
        });

        test('should throw TypeError with correct message for invalid time', () => {
            expect(() => new Time('invalid' as any)).toThrow('`time` must be a number or a Time instance');
        });

        test('should throw RangeError for negative time values', () => {
            expect(() => new Time(-1)).toThrow(RangeError);
            expect(() => new Time(-0.1)).toThrow(RangeError);
            expect(() => new Time(-100, TimeUnit.Second)).toThrow(RangeError);
        });

        test('should throw RangeError with correct message for negative time', () => {
            expect(() => new Time(-1)).toThrow('`time` must be 0 or greater');
        });

        test('should throw TypeError for invalid TimeUnit', () => {
            expect(() => new Time(5, 'invalid' as any)).toThrow(TypeError);
            expect(() => new Time(5, 123 as any)).toThrow(TypeError);
            expect(() => new Time(5, null as any)).toThrow(TypeError);
        });

        test('should throw TypeError with correct message for invalid TimeUnit', () => {
            expect(() => new Time(5, 'invalid' as any)).toThrow('`from` must be a valid `TimeUnit`');
        });
    });

    describe('constructor functionality', () => {
        test('should create Time with default TimeUnit.Millisecond', () => {
            const time = new Time(1000);
            expect(time.ms).toBe(1000);
        });

        test('should create Time with TimeUnit.Millisecond explicitly', () => {
            const time = new Time(500, TimeUnit.Millisecond);
            expect(time.ms).toBe(500);
        });

        test('should create Time with TimeUnit.Second', () => {
            const time = new Time(5, TimeUnit.Second);
            expect(time.ms).toBe(5000);
        });

        test('should create Time with TimeUnit.Minute', () => {
            const time = new Time(2, TimeUnit.Minute);
            expect(time.ms).toBe(120000);
        });

        test('should create Time with TimeUnit.Hour', () => {
            const time = new Time(1, TimeUnit.Hour);
            expect(time.ms).toBe(3600000);
        });

        test('should create Time with TimeUnit.Day', () => {
            const time = new Time(1, TimeUnit.Day);
            expect(time.ms).toBe(86400000);
        });

        test('should create Time with TimeUnit.Week', () => {
            const time = new Time(1, TimeUnit.Week);
            expect(time.ms).toBe(604800000);
        });

        test('should create Time with TimeUnit.Year', () => {
            const time = new Time(1, TimeUnit.Year);
            expect(time.ms).toBe(31557600000);
        });

        test('should handle zero time value', () => {
            const time = new Time(0);
            expect(time.ms).toBe(0);
        });

        test('should handle floating-point time values', () => {
            const time = new Time(1.5, TimeUnit.Second);
            expect(time.ms).toBe(1500);
        });

        test('should create Time from another Time instance', () => {
            const originalTime = new Time(5000);
            const copiedTime = new Time(originalTime);
            expect(copiedTime.ms).toBe(5000);
            expect(copiedTime.ms).toBe(originalTime.ms);
        });

        test('should create Time from another Time instance with different unit (should ignore unit parameter)', () => {
            const originalTime = new Time(2, TimeUnit.Minute);
            const copiedTime = new Time(originalTime, TimeUnit.Hour); // Unit should be ignored when copying from Time
            expect(copiedTime.ms).toBe(120000); // Should be 2 minutes in ms, not 2 hours
            expect(copiedTime.ms).toBe(originalTime.ms);
        });

        test('should create independent Time instances when copying', () => {
            const originalTime = new Time(1000);
            const copiedTime = new Time(originalTime);
            
            // Modify the original
            originalTime.ms = 2000;
            
            // Copied should remain unchanged
            expect(copiedTime.ms).toBe(1000);
            expect(originalTime.ms).toBe(2000);
        });
    });

    describe('conversion methods', () => {
        describe('toSecs', () => {
            test('should convert milliseconds to seconds correctly', () => {
                const time = new Time(5000);
                expect(time.toSeconds()).toBe(5);
            });

            test('should convert from different units to seconds', () => {
                const timeFromMinutes = new Time(2, TimeUnit.Minute);
                expect(timeFromMinutes.toSeconds()).toBe(120);

                const timeFromHours = new Time(1, TimeUnit.Hour);
                expect(timeFromHours.toSeconds()).toBe(3600);
            });

            test('should handle fractional seconds', () => {
                const time = new Time(1500);
                expect(time.toSeconds()).toBe(1.5);
            });

            test('should handle zero time', () => {
                const time = new Time(0);
                expect(time.toSeconds()).toBe(0);
            });
        });

        describe('toMins', () => {
            test('should convert milliseconds to minutes correctly', () => {
                const time = new Time(300000); // 5 minutes in ms
                expect(time.toMinutes()).toBe(5);
            });

            test('should convert from seconds to minutes', () => {
                const time = new Time(5, TimeUnit.Second);
                expect(time.toMinutes()).toBeCloseTo(0.08333333333333333);
            });

            test('should convert from hours to minutes', () => {
                const time = new Time(2, TimeUnit.Hour);
                expect(time.toMinutes()).toBe(120);
            });

            test('should handle fractional minutes', () => {
                const time = new Time(90000); // 1.5 minutes in ms
                expect(time.toMinutes()).toBe(1.5);
            });
        });

        describe('toHrs', () => {
            test('should convert milliseconds to hours correctly', () => {
                const time = new Time(7200000); // 2 hours in ms
                expect(time.toHours()).toBe(2);
            });

            test('should convert from minutes to hours', () => {
                const time = new Time(90, TimeUnit.Minute);
                expect(time.toHours()).toBe(1.5);
            });

            test('should convert from days to hours', () => {
                const time = new Time(2, TimeUnit.Day);
                expect(time.toHours()).toBe(48);
            });

            test('should handle fractional hours', () => {
                const time = new Time(30, TimeUnit.Minute);
                expect(time.toHours()).toBe(0.5);
            });
        });

        describe('toDays', () => {
            test('should convert milliseconds to days correctly', () => {
                const time = new Time(172800000); // 2 days in ms
                expect(time.toDays()).toBe(2);
            });

            test('should convert from hours to days', () => {
                const time = new Time(48, TimeUnit.Hour);
                expect(time.toDays()).toBe(2);
            });

            test('should convert from weeks to days', () => {
                const time = new Time(2, TimeUnit.Week);
                expect(time.toDays()).toBe(14);
            });

            test('should handle fractional days', () => {
                const time = new Time(12, TimeUnit.Hour);
                expect(time.toDays()).toBe(0.5);
            });
        });

        describe('toWeeks', () => {
            test('should convert milliseconds to weeks correctly', () => {
                const time = new Time(1209600000); // 2 weeks in ms
                expect(time.toWeeks()).toBe(2);
            });

            test('should convert from days to weeks', () => {
                const time = new Time(14, TimeUnit.Day);
                expect(time.toWeeks()).toBe(2);
            });

            test('should convert from years to weeks', () => {
                const time = new Time(1, TimeUnit.Year);
                expect(time.toWeeks()).toBeCloseTo(52.17857);
            });

            test('should handle fractional weeks', () => {
                const time = new Time(3.5, TimeUnit.Day);
                expect(time.toWeeks()).toBe(0.5);
            });
        });

        describe('toYrs', () => {
            test('should convert milliseconds to years correctly', () => {
                const time = new Time(63115200000);
                expect(time.toYears()).toBe(2);
            });

            test('should convert from days to years', () => {
                const time = new Time(730, TimeUnit.Day);
                expect(time.toYears()).toBeCloseTo(2);
            });

            test('should handle fractional years', () => {
                const time = new Time(182.5, TimeUnit.Day);
                expect(time.toYears()).toBeCloseTo(0.499658);
            });
        });
    });

    describe('property access', () => {
        test('should allow direct access to ms property', () => {
            const time = new Time(5000);
            expect(time.ms).toBe(5000);
        });

        test('should allow modification of ms property', () => {
            const time = new Time(5000);
            time.ms = 10000;
            expect(time.ms).toBe(10000);
            expect(time.toSeconds()).toBe(10);
        });
    });

    describe('edge cases', () => {
        test('should handle very large time values', () => {
            const time = new Time(Number.MAX_SAFE_INTEGER);
            expect(time.ms).toBe(Number.MAX_SAFE_INTEGER);
            expect(() => time.toSeconds()).not.toThrow();
        });

        test('should handle very small fractional values', () => {
            const time = new Time(0.001);
            expect(time.ms).toBe(0.001);
            expect(time.toSeconds()).toBe(0.000001);
        });

        test('should handle precision with floating-point arithmetic', () => {
            const time = new Time(1.1, TimeUnit.Second);
            expect(time.ms).toBe(1100);
            expect(time.toSeconds()).toBe(1.1);
        });

        test('should maintain precision through conversions', () => {
            const originalValue = 2.5;
            const time = new Time(originalValue, TimeUnit.Hour);
            const roundTrip = new Time(time.toHours(), TimeUnit.Hour);
            expect(roundTrip.ms).toBe(time.ms);
        });
    });

    describe('integration tests', () => {
        test('should work with chained conversions', () => {
            const time = new Time(1, TimeUnit.Hour);
            const minutes = time.toMinutes();
            const seconds = new Time(minutes, TimeUnit.Minute).toSeconds();
            expect(seconds).toBe(3600);
        });

        test('should maintain consistency across different units', () => {
            const milliseconds = 3661000; // 1 hour, 1 minute, 1 second
            const time = new Time(milliseconds);
            
            expect(time.toSeconds()).toBe(3661);
            expect(time.toMinutes()).toBeCloseTo(61.01666666666667);
            expect(time.toHours()).toBeCloseTo(1.0169444444444444);
        });

        test('should handle example from documentation', () => {
            // Long Usage example
            const time = new Time(5, TimeUnit.Second);
            expect(time.ms).toBe(5000);
            expect(time.toMinutes()).toBeCloseTo(0.08333333333333333);

            // Short Usage examples
            expect(new Time(5, TimeUnit.Minute).toSeconds()).toBe(300);
            expect(new Time(10000).toSeconds()).toBe(10);
        });
    });

    describe('boundary value testing', () => {
        test('should handle minimum valid value', () => {
            const time = new Time(0);
            expect(time.ms).toBe(0);
            expect(time.toSeconds()).toBe(0);
            expect(time.toMinutes()).toBe(0);
            expect(time.toHours()).toBe(0);
            expect(time.toDays()).toBe(0);
            expect(time.toWeeks()).toBe(0);
            expect(time.toYears()).toBe(0);
        });

        test('should handle very small positive values', () => {
            const time = new Time(1);
            expect(time.ms).toBe(1);
            expect(time.toSeconds()).toBe(0.001);
        });

        test('should handle exact unit conversions', () => {
            expect(new Time(1, TimeUnit.Second).ms).toBe(1000);
            expect(new Time(1, TimeUnit.Minute).ms).toBe(60000);
            expect(new Time(1, TimeUnit.Hour).ms).toBe(3600000);
            expect(new Time(1, TimeUnit.Day).ms).toBe(86400000);
            expect(new Time(1, TimeUnit.Week).ms).toBe(604800000);
            expect(new Time(1, TimeUnit.Year).ms).toBe(31557600000);
        });
    });

    describe('type safety and immutability', () => {
        test('should not modify constructor parameters', () => {
            const originalTime = 5;
            const originalUnit = TimeUnit.Second;
            
            new Time(originalTime, originalUnit);
            
            // Values should remain unchanged
            expect(originalTime).toBe(5);
            expect(originalUnit).toBe(TimeUnit.Second);
        });

        test('should return new numbers from conversion methods', () => {
            const time = new Time(5000);
            const seconds1 = time.toSeconds();
            const seconds2 = time.toSeconds();
            
            expect(seconds1).toBe(seconds2);
            expect(seconds1).toBe(5);
        });

        test('should work with const instances', () => {
            const time = new Time(1000);
            expect(time.toSeconds()).toBe(1);
            expect(time.ms).toBe(1000);
        });
    });

    describe('valueOf method', () => {
        test('should return the milliseconds value', () => {
            const time = new Time(5000);
            expect(time.valueOf()).toBe(5000);
        });

        test('should return the same as ms property', () => {
            const time = new Time(2500);
            expect(time.valueOf()).toBe(time.ms);
        });

        test('should work with different time units', () => {
            const time = new Time(5, TimeUnit.Second);
            expect(time.valueOf()).toBe(5000);
        });

        test('should handle zero values', () => {
            const time = new Time(0);
            expect(time.valueOf()).toBe(0);
        });

        test('should handle fractional values', () => {
            const time = new Time(1500.5);
            expect(time.valueOf()).toBe(1500.5);
        });

        test('should enable numeric operations', () => {
            const time1 = new Time(1000);
            const time2 = new Time(2000);
            expect(+time1 + +time2).toBe(3000);
            expect(+time2 - +time1).toBe(1000);
        });
    });

    describe('toString method', () => {
        test('should return formatted string for seconds', () => {
            const time = new Time(5000);
            expect(time.toString()).toBe('5 seconds');
        });

        test('should handle zero values', () => {
            const time = new Time(0);
            expect(time.toString()).toBe('');
        });

        test('should handle single units with proper pluralization', () => {
            const oneSecond = new Time(1000);
            expect(oneSecond.toString()).toBe('1 second');
            
            const twoSeconds = new Time(2000);
            expect(twoSeconds.toString()).toBe('2 seconds');
            
            const oneMinute = new Time(60000);
            expect(oneMinute.toString()).toBe('1 minute');
            
            const twoMinutes = new Time(120000);
            expect(twoMinutes.toString()).toBe('2 minutes');
        });

        test('should handle multiple time units', () => {
            const time = new Time(70000); // 1 minute, 10 seconds
            expect(time.toString()).toBe('1 minute, 10 seconds');
        });

        test('should handle complex time combinations', () => {
            const time = new Time(90061000); // 1 day, 1 hour, 1 minute, 1 second
            expect(time.toString()).toBe('1 day, 1 hour, 1 minute, 1 second');
        });

        test('should handle fractional milliseconds', () => {
            const time = new Time(1500.5);
            expect(time.toString()).toBe('1 second, 500.5 milliseconds');
        });

        test('should work with different time units in constructor', () => {
            const time = new Time(5, TimeUnit.Second);
            expect(time.toString()).toBe('5 seconds');
        });

        test('should handle only milliseconds', () => {
            const time = new Time(500);
            expect(time.toString()).toBe('500 milliseconds');
        });

        test('should handle years, weeks, and days', () => {
            const time = new Time(1, TimeUnit.Year);
            const result = time.toString();
            expect(result).toContain('1 year');
        });

        test('should handle single millisecond', () => {
            const time = new Time(1);
            expect(time.toString()).toBe('1 millisecond');
        });

        test('should handle multiple milliseconds', () => {
            const time = new Time(500);
            expect(time.toString()).toBe('500 milliseconds');
        });
    });

    describe('toJSON method', () => {
        test('should return complete JSON representation', () => {
            const time = new Time(60, TimeUnit.Second);
            const json = time.toJSON();

            expect(json).toEqual({
                ms: 60000,
                seconds: 60,
                minutes: 1,
                hours: 1/60,
                days: 1/1440,
                weeks: 1/10080,
                years: expect.any(Number)
            });
        });

        test('should include all time unit conversions', () => {
            const time = new Time(3600000); // 1 hour
            const json = time.toJSON();

            expect(json).toHaveProperty('ms');
            expect(json).toHaveProperty('seconds');
            expect(json).toHaveProperty('minutes');
            expect(json).toHaveProperty('hours');
            expect(json).toHaveProperty('days');
            expect(json).toHaveProperty('weeks');
            expect(json).toHaveProperty('years');
        });

        test('should have correct values for 1 hour', () => {
            const time = new Time(1, TimeUnit.Hour);
            const json = time.toJSON();

            expect(json.ms).toBe(3600000);
            expect(json.seconds).toBe(3600);
            expect(json.minutes).toBe(60);
            expect(json.hours).toBe(1);
            expect(json.days).toBeCloseTo(1/24);
            expect(json.weeks).toBeCloseTo(1/168);
            expect(json.years).toBeCloseTo(1/8766);
        });

        test('should handle zero values', () => {
            const time = new Time(0);
            const json = time.toJSON();

            expect(json.ms).toBe(0);
            expect(json.seconds).toBe(0);
            expect(json.minutes).toBe(0);
            expect(json.hours).toBe(0);
            expect(json.days).toBe(0);
            expect(json.weeks).toBe(0);
            expect(json.years).toBe(0);
        });

        test('should be serializable to JSON string', () => {
            const time = new Time(5, TimeUnit.Minute);
            const json = time.toJSON();
            
            expect(() => JSON.stringify(json)).not.toThrow();
            
            const jsonString = JSON.stringify(json);
            const parsed = JSON.parse(jsonString);
            
            expect(parsed).toEqual(json);
        });

        test('should maintain precision in JSON', () => {
            const time = new Time(1500.75);
            const json = time.toJSON();

            expect(json.ms).toBe(1500.75);
            expect(json.seconds).toBe(1.50075);
        });

        test('should work with JSON.stringify directly on Time instance', () => {
            const time = new Time(30, TimeUnit.Second);
            
            expect(() => JSON.stringify(time)).not.toThrow();
            
            const jsonString = JSON.stringify(time);
            const parsed = JSON.parse(jsonString);
            
            expect(parsed.ms).toBe(30000);
            expect(parsed.seconds).toBe(30);
        });
    });
});
