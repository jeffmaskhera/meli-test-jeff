const { formatNumberPrice } = require('../helpers');
const { getDecimalCount } = require('../helpers');



describe('formatNumberPrice', () => {
    test('should return an empty string for non-numeric input', () => {
        expect(formatNumberPrice('abc')).toBe('');
        expect(formatNumberPrice(null)).toBe('');
        expect(formatNumberPrice(undefined)).toBe('');
        expect(formatNumberPrice({})).toBe('');
    });

    test('should return an empty string for negative numbers', () => {
        expect(formatNumberPrice(-987654.321)).toBe('');
        expect(formatNumberPrice(-123)).toBe('');
    });

    test('should handle positive numbers correctly', () => {
        expect(formatNumberPrice(1234567.89)).toBe('1.234.567,89');
        expect(formatNumberPrice(987654.321)).toBe('987.654,32');
        expect(formatNumberPrice(123)).toBe('123');
    });
});




describe('getDecimalCount', () => {
    test('should return 0 for integer numbers', () => {
        expect(getDecimalCount(123)).toBe(0);
        expect(getDecimalCount(-456)).toBe(0);
        expect(getDecimalCount(0)).toBe(0);
    });

    test('should return correct decimal count for decimal numbers', () => {
        expect(getDecimalCount(123.45)).toBe(2);
        expect(getDecimalCount(-789.0123)).toBe(4);
        expect(getDecimalCount(0.6789)).toBe(4);
    });

    test('should return 0 for non-finite numbers', () => {
        expect(getDecimalCount(NaN)).toBe(0);
        expect(getDecimalCount(Infinity)).toBe(0);
        expect(getDecimalCount(-Infinity)).toBe(0);
    });

    test('should handle string input', () => {
        expect(getDecimalCount('123.45')).toBe(2);
        expect(getDecimalCount('-789.0123')).toBe(4);
        expect(getDecimalCount('0.6789')).toBe(4);
        expect(getDecimalCount('string')).toBe(0);
    });

    test('should return 0 for numbers without decimal part', () => {
        expect(getDecimalCount(123)).toBe(0);
        expect(getDecimalCount(-456)).toBe(0);
        expect(getDecimalCount(0)).toBe(0);
    });
});