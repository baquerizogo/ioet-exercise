import { areHoursValid, isDay, parseEmployeeWorkdays } from "./workday.service";

test('Return false if entry and departure hour are inverted', () => {
    expect(areHoursValid(1800, 1400)).toBeFalsy();
})

test('Return false if entry or departure hour are not time values', () => {
    expect(areHoursValid(2700, 3400)).toBeFalsy();
})

test('Return true if input day is type Days', () => {
    expect(() => isDay('MO')).toBeTruthy();
})

test('Return false if input day is not type Days', () => {
    expect(() => isDay('ME')).toBeTruthy();
})

test('Throw error if input has invalid format', () => {
    expect(() => parseEmployeeWorkdays('MO10:0012:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00')).toThrowError();
})

test('Return an array with parsed workdays', () => {
    const workdays = parseEmployeeWorkdays('MO10:00-12:00,SU20:00-21:00');
    expect(workdays.length > 0).toBeTruthy();
})