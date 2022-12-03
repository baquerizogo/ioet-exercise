import { parseEmployeesData } from "./employees.service";

test('Throw error if raw data is empty', () => {
    expect(() => parseEmployeesData('')).toThrow("Wrong data format. Please check your data and try again.");
});

test('Throw error if raw data is invalid', () => {
    const str = "RENEMO10:00-12:00,dedede"
    
    expect(() => parseEmployeesData(str)).toThrow("Wrong data format. Please check your data and try again.");
});