import { readInputFile } from "./index.service";

test('Return a string with raw data from .txt file', () => {
    const result = readInputFile('../public/assets/data.txt');
    expect(typeof result).toBe('string');
});

test('Throw error when file is not found', () => {
    expect(() => readInputFile('')).toThrow('File not found');
});