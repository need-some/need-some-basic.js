import { padNumber, padLeft, padRight } from '../stdmethods';

/**
 * Functions to create formatter functions for number and string
 */

/**
 * Type to define formatter for number-only parameters.
 */
export type NumberTokenFormat = (input: number) => string;

/**
 * Type to define formatter for number or string parameters. Usually the number is treated as a string consisting of digits.
 */
export type StringTokenFormat = (input: string | number) => string;

/**
 * Creates a formatter that prepends zero characters.
 * @param n the number of characters of the result string
 */
export function padNumberLeft(n: number): NumberTokenFormat {
	return input => padNumber(input, n);
}

/**
 * Creates a formatter that adds characters to the start of a string
 * @param c the character to preend
 * @param n the number of characters of the result string
 */
export function padStringLeft(c: string, n: number): StringTokenFormat {
	return input => padLeft('' + input, c, n);
}

/**
 * Creates a formatter that adds characters to the end of a string
 * @param c the character to append
 * @param n the number of characters of the result string
 */
export function padStringRight(c: string, n: number): StringTokenFormat {
	return input => padRight('' + input, c, n);
}

/**
 * Creates a formatter that changes all characters to upper case.
 * @param locale The locale to use for upper case. TODO: Currently this locale is ignored.
 */
export function toUpperCase(locale: string): StringTokenFormat {
	return input => ('' + input).toUpperCase(); // TODO: use locale
}

/**
 * Creates a formatter that changes the first character to upper case.
 * @param locale The locale to use for upper case. TODO: Currently this locale is ignored.
 */
export function firstToUpper(locale: string): StringTokenFormat {
	return input => ('' + input).toUpperCase().substr(0, 1) + ('' + input).substr(1); // TODO: use locale
}
