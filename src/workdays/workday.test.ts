import { areHoursValid } from "./workday.service";

test('Return false if entry and departure hour are inverted', () => {
    expect(areHoursValid(1800, 1400)).toBeFalsy();
})

test('Return false if entry or departure hour are not time values', () => {
    expect(areHoursValid(2700, 3400)).toBeFalsy();
})