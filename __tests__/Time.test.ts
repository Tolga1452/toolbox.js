import { Time } from '../src/classes';

describe('Time', () => {
    describe('static factory validation', () => {
        test('should throw TypeError for non-number ms parameter', () => {
            expect(() => Time.fromMilliseconds('not a number' as any)).toThrow(TypeError);
            expect(() => Time.fromMilliseconds(null as any)).toThrow(TypeError);
            expect(() => Time.fromMilliseconds(undefined as any)).toThrow(TypeError);
            expect(() => Time.fromMilliseconds({} as any)).toThrow(TypeError);
            expect(() => Time.fromMilliseconds([] as any)).toThrow(TypeError);
            expect(() => Time.fromMilliseconds(true as any)).toThrow(TypeError);
        });

        test('should throw RangeError for negative ms values', () => {
            expect(() => Time.fromMilliseconds(-1)).toThrow(RangeError);
            expect(() => Time.fromMilliseconds(-0.1)).toThrow(RangeError);
        });

        test('should throw TypeError for non-number seconds parameter', () => {
            expect(() => Time.fromSeconds('not a number' as any)).toThrow(TypeError);
        });
        test('should throw RangeError for negative seconds', () => {
            expect(() => Time.fromSeconds(-1)).toThrow(RangeError);
        });
        test('should throw TypeError for non-number minutes parameter', () => {
            expect(() => Time.fromMinutes('not a number' as any)).toThrow(TypeError);
        });
        test('should throw RangeError for negative minutes', () => {
            expect(() => Time.fromMinutes(-1)).toThrow(RangeError);
        });
        test('should throw TypeError for non-number hours parameter', () => {
            expect(() => Time.fromHours('not a number' as any)).toThrow(TypeError);
        });
        test('should throw RangeError for negative hours', () => {
            expect(() => Time.fromHours(-1)).toThrow(RangeError);
        });
        test('should throw TypeError for non-number days parameter', () => {
            expect(() => Time.fromDays('not a number' as any)).toThrow(TypeError);
        });
        test('should throw RangeError for negative days', () => {
            expect(() => Time.fromDays(-1)).toThrow(RangeError);
        });
        test('should throw TypeError for non-number weeks parameter', () => {
            expect(() => Time.fromWeeks('not a number' as any)).toThrow(TypeError);
        });
        test('should throw RangeError for negative weeks', () => {
            expect(() => Time.fromWeeks(-1)).toThrow(RangeError);
        });
        test('should throw TypeError for non-number years parameter', () => {
            expect(() => Time.fromYears('not a number' as any)).toThrow(TypeError);
        });
        test('should throw RangeError for negative years', () => {
            expect(() => Time.fromYears(-1)).toThrow(RangeError);
        });
    });

    describe('constructor functionality', () => {
        test('should create Time from milliseconds', () => {
            const time = Time.fromMilliseconds(1000);
            expect(time.toMilliseconds()).toBe(1000);
        });

        test('should create Time from seconds', () => {
            const time = Time.fromSeconds(5);
            expect(time.toMilliseconds()).toBe(5000);
        });

        test('should create Time from minutes', () => {
            const time = Time.fromMinutes(2);
            expect(time.toMilliseconds()).toBe(120000);
        });

        test('should create Time from hours', () => {
            const time = Time.fromHours(1);
            expect(time.toMilliseconds()).toBe(3600000);
        });

        test('should create Time from days', () => {
            const time = Time.fromDays(1);
            expect(time.toMilliseconds()).toBe(86400000);
        });

        test('should create Time from weeks', () => {
            const time = Time.fromWeeks(1);
            expect(time.toMilliseconds()).toBe(604800000);
        });

        test('should create Time from years', () => {
            const time = Time.fromYears(1);
            expect(time.toMilliseconds()).toBe(31557600000);
        });

        test('should handle zero time value', () => {
            const time = Time.fromMilliseconds(0);
            expect(time.toMilliseconds()).toBe(0);
        });

        test('should handle floating-point time values', () => {
            const time = Time.fromSeconds(1.5);
            expect(time.toMilliseconds()).toBe(1500);
        });
    });

    describe('conversion methods', () => {
        describe('toSecs', () => {
            test('should convert milliseconds to seconds correctly', () => {
                const time = Time.fromMilliseconds(5000);
                expect(time.toSeconds()).toBe(5);
            });

            test('should convert from different units to seconds', () => {
                const timeFromMinutes = Time.fromMinutes(2);
                expect(timeFromMinutes.toSeconds()).toBe(120);

                const timeFromHours = Time.fromHours(1);
                expect(timeFromHours.toSeconds()).toBe(3600);
            });

            test('should handle fractional seconds', () => {
                const time = Time.fromMilliseconds(1500);
                expect(time.toSeconds()).toBe(1.5);
            });

            test('should handle zero time', () => {
                const time = Time.fromMilliseconds(0);
                expect(time.toSeconds()).toBe(0);
            });
        });

        describe('toMins', () => {
            test('should convert milliseconds to minutes correctly', () => {
                const time = Time.fromMilliseconds(300000); // 5 minutes in ms
                expect(time.toMinutes()).toBe(5);
            });

            test('should convert from seconds to minutes', () => {
                const time = Time.fromSeconds(5);
                expect(time.toMinutes()).toBeCloseTo(0.08333333333333333);
            });

            test('should convert from hours to minutes', () => {
                const time = Time.fromHours(2);
                expect(time.toMinutes()).toBe(120);
            });

            test('should handle fractional minutes', () => {
                const time = Time.fromMilliseconds(90000); // 1.5 minutes in ms
                expect(time.toMinutes()).toBe(1.5);
            });
        });

        describe('toHrs', () => {
            test('should convert milliseconds to hours correctly', () => {
                const time = Time.fromMilliseconds(7200000); // 2 hours in ms
                expect(time.toHours()).toBe(2);
            });

            test('should convert from minutes to hours', () => {
                const time = Time.fromMinutes(90);
                expect(time.toHours()).toBe(1.5);
            });

            test('should convert from days to hours', () => {
                const time = Time.fromDays(2);
                expect(time.toHours()).toBe(48);
            });

            test('should handle fractional hours', () => {
                const time = Time.fromMinutes(30);
                expect(time.toHours()).toBe(0.5);
            });
        });

        describe('toDays', () => {
            test('should convert milliseconds to days correctly', () => {
                const time = Time.fromMilliseconds(172800000); // 2 days in ms
                expect(time.toDays()).toBe(2);
            });

            test('should convert from hours to days', () => {
                const time = Time.fromHours(48);
                expect(time.toDays()).toBe(2);
            });

            test('should convert from weeks to days', () => {
                const time = Time.fromWeeks(2);
                expect(time.toDays()).toBe(14);
            });

            test('should handle fractional days', () => {
                const time = Time.fromHours(12);
                expect(time.toDays()).toBe(0.5);
            });
        });

        describe('toWeeks', () => {
            test('should convert milliseconds to weeks correctly', () => {
                const time = Time.fromMilliseconds(1209600000); // 2 weeks in ms
                expect(time.toWeeks()).toBe(2);
            });

            test('should convert from days to weeks', () => {
                const time = Time.fromDays(14);
                expect(time.toWeeks()).toBe(2);
            });

            test('should convert from years to weeks', () => {
                const time = Time.fromYears(1);
                expect(time.toWeeks()).toBeCloseTo(52.17857);
            });

            test('should handle fractional weeks', () => {
                const time = Time.fromDays(3.5);
                expect(time.toWeeks()).toBe(0.5);
            });
        });

        describe('toYrs', () => {
            test('should convert milliseconds to years correctly', () => {
                const time = Time.fromMilliseconds(63115200000);
                expect(time.toYears()).toBe(2);
            });

            test('should convert from days to years', () => {
                const time = Time.fromDays(730);
                expect(time.toYears()).toBeCloseTo(2);
            });

            test('should handle fractional years', () => {
                const time = Time.fromDays(182.5);
                expect(time.toYears()).toBeCloseTo(0.499658);
            });
        });
    });

    describe('property access', () => {
        test('should allow direct access to ms value via toMilliseconds()', () => {
            const time = Time.fromMilliseconds(5000);
            expect(time.toMilliseconds()).toBe(5000);
        });
    });

    describe('edge cases', () => {
        test('should handle very large time values', () => {
            const time = Time.fromMilliseconds(Number.MAX_SAFE_INTEGER);
            expect(time.toMilliseconds()).toBe(Number.MAX_SAFE_INTEGER);
            expect(() => time.toSeconds()).not.toThrow();
        });

        test('should handle very small fractional values', () => {
            const time = Time.fromMilliseconds(0.001);
            expect(time.toMilliseconds()).toBe(0.001);
            expect(time.toSeconds()).toBe(0.000001);
        });

        test('should handle precision with floating-point arithmetic', () => {
            const time = Time.fromSeconds(1.1);
            expect(time.toMilliseconds()).toBe(1100);
            expect(time.toSeconds()).toBe(1.1);
        });

        test('should maintain precision through conversions', () => {
            const originalValue = 2.5;
            const time = Time.fromHours(originalValue);
            const roundTrip = Time.fromHours(time.toHours());
            expect(roundTrip.toMilliseconds()).toBe(time.toMilliseconds());
        });
    });

    describe('integration tests', () => {
        test('should work with chained conversions', () => {
            const time = Time.fromHours(1);
            const minutes = time.toMinutes();
            const seconds = Time.fromMinutes(minutes).toSeconds();
            expect(seconds).toBe(3600);
        });

        test('should maintain consistency across different units', () => {
            const milliseconds = 3661000; // 1 hour, 1 minute, 1 second
            const time = Time.fromMilliseconds(milliseconds);
            
            expect(time.toSeconds()).toBe(3661);
            expect(time.toMinutes()).toBeCloseTo(61.01666666666667);
            expect(time.toHours()).toBeCloseTo(1.0169444444444444);
        });

        test('should handle example from documentation', () => {
            // Long Usage example
            const time = Time.fromSeconds(5);
            expect(time.toMilliseconds()).toBe(5000);
            expect(time.toMinutes()).toBeCloseTo(0.08333333333333333);

            // Short Usage examples
            expect(Time.fromMinutes(5).toSeconds()).toBe(300);
            expect(Time.fromMilliseconds(10000).toSeconds()).toBe(10);
        });
    });

    describe('boundary value testing', () => {
        test('should handle minimum valid value', () => {
            const time = Time.fromMilliseconds(0);
            expect(time.toMilliseconds()).toBe(0);
            expect(time.toSeconds()).toBe(0);
            expect(time.toMinutes()).toBe(0);
            expect(time.toHours()).toBe(0);
            expect(time.toDays()).toBe(0);
            expect(time.toWeeks()).toBe(0);
            expect(time.toYears()).toBe(0);
        });

        test('should handle very small positive values', () => {
            const time = Time.fromMilliseconds(1);
            expect(time.toMilliseconds()).toBe(1);
            expect(time.toSeconds()).toBe(0.001);
        });

        test('should handle exact unit conversions', () => {
            expect(Time.fromSeconds(1).toMilliseconds()).toBe(1000);
            expect(Time.fromMinutes(1).toMilliseconds()).toBe(60000);
            expect(Time.fromHours(1).toMilliseconds()).toBe(3600000);
            expect(Time.fromDays(1).toMilliseconds()).toBe(86400000);
            expect(Time.fromWeeks(1).toMilliseconds()).toBe(604800000);
            expect(Time.fromYears(1).toMilliseconds()).toBe(31557600000);
        });
    });

    describe('type safety and immutability', () => {
        test('should return new numbers from conversion methods', () => {
            const time = Time.fromMilliseconds(5000);
            const seconds1 = time.toSeconds();
            const seconds2 = time.toSeconds();
            
            expect(seconds1).toBe(seconds2);
            expect(seconds1).toBe(5);
        });

        test('should work with const instances', () => {
            const time = Time.fromMilliseconds(1000);
            expect(time.toSeconds()).toBe(1);
            expect(time.toMilliseconds()).toBe(1000);
        });
    });

    describe('valueOf method', () => {
        test('should return the milliseconds value', () => {
            const time = Time.fromMilliseconds(5000);
            expect(time.valueOf()).toBe(5000);
        });

        test('should return the same as toMilliseconds()', () => {
            const time = Time.fromMilliseconds(2500);
            expect(time.valueOf()).toBe(time.toMilliseconds());
        });

        test('should work with different time units', () => {
            const time = Time.fromSeconds(5);
            expect(time.valueOf()).toBe(5000);
        });

        test('should handle zero values', () => {
            const time = Time.fromMilliseconds(0);
            expect(time.valueOf()).toBe(0);
        });

        test('should handle fractional values', () => {
            const time = Time.fromMilliseconds(1500.5);
            expect(time.valueOf()).toBe(1500.5);
        });

        test('should enable numeric operations', () => {
            const time1 = Time.fromMilliseconds(1000);
            const time2 = Time.fromMilliseconds(2000);
            expect(+time1 + +time2).toBe(3000);
            expect(+time2 - +time1).toBe(1000);
        });
    });

    describe('toString method', () => {
        test('should return formatted string for seconds', () => {
            const time = Time.fromMilliseconds(5000);
            expect(time.toString()).toBe('5 seconds');
        });

        test('should handle zero values', () => {
            const time = Time.fromMilliseconds(0);
            expect(time.toString()).toBe('');
        });

        test('should handle single units with proper pluralization', () => {
            const oneSecond = Time.fromMilliseconds(1000);
            expect(oneSecond.toString()).toBe('1 second');
            
            const twoSeconds = Time.fromMilliseconds(2000);
            expect(twoSeconds.toString()).toBe('2 seconds');
            
            const oneMinute = Time.fromMilliseconds(60000);
            expect(oneMinute.toString()).toBe('1 minute');
            
            const twoMinutes = Time.fromMilliseconds(120000);
            expect(twoMinutes.toString()).toBe('2 minutes');
        });

        test('should handle multiple time units', () => {
            const time = Time.fromMilliseconds(70000); // 1 minute, 10 seconds
            expect(time.toString()).toBe('1 minute, 10 seconds');
        });

        test('should handle complex time combinations', () => {
            const time = Time.fromMilliseconds(90061000); // 1 day, 1 hour, 1 minute, 1 second
            expect(time.toString()).toBe('1 day, 1 hour, 1 minute, 1 second');
        });

        test('should handle fractional milliseconds', () => {
            const time = Time.fromMilliseconds(1500.5);
            expect(time.toString()).toBe('1 second, 500.5 milliseconds');
        });

        test('should work with different time units in static methods', () => {
            const time = Time.fromSeconds(5);
            expect(time.toString()).toBe('5 seconds');
        });

        test('should handle only milliseconds', () => {
            const time = Time.fromMilliseconds(500);
            expect(time.toString()).toBe('500 milliseconds');
        });

        test('should handle years, weeks, and days', () => {
            const time = Time.fromYears(1);
            const result = time.toString();
            expect(result).toContain('1 year');
        });

        test('should handle single millisecond', () => {
            const time = Time.fromMilliseconds(1);
            expect(time.toString()).toBe('1 millisecond');
        });

        test('should handle multiple milliseconds', () => {
            const time = Time.fromMilliseconds(500);
            expect(time.toString()).toBe('500 milliseconds');
        });
    });

    describe('toJSON method', () => {
        test('should return complete JSON representation', () => {
            const time = Time.fromSeconds(60);
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
            const time = Time.fromMilliseconds(3600000); // 1 hour
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
            const time = Time.fromHours(1);
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
            const time = Time.fromMilliseconds(0);
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
            const time = Time.fromMinutes(5);
            const json = time.toJSON();
            
            expect(() => JSON.stringify(json)).not.toThrow();
            
            const jsonString = JSON.stringify(json);
            const parsed = JSON.parse(jsonString);
            
            expect(parsed).toEqual(json);
        });

        test('should maintain precision in JSON', () => {
            const time = Time.fromMilliseconds(1500.75);
            const json = time.toJSON();

            expect(json.ms).toBe(1500.75);
            expect(json.seconds).toBe(1.50075);
        });

        test('should work with JSON.stringify directly on Time instance', () => {
            const time = Time.fromSeconds(30);
            
            expect(() => JSON.stringify(time)).not.toThrow();
            
            const jsonString = JSON.stringify(time);
            const parsed = JSON.parse(jsonString);
            
            expect(parsed.ms).toBe(30000);
            expect(parsed.seconds).toBe(30);
        });
    });
});
