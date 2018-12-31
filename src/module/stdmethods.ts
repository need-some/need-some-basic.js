/**
 * Methods for compatibility, but not defined as polyfill
 */

/**
 * Truncate fractional part of number. Returns the signed integer part
 * @param n the number to trunc
 * @returns the integer part
 */
export const __truncPolyfill: ((n: number) => number) = n => (n >= 0 ? Math.floor(n) : Math.ceil(n));

/**
 * Truncate fractional part of number. Returns the signed integer part
 * @param n the number to trunc
 * @returns the integer part
 */
// tslint:disable-next-line: no-any //fill trunc method
export const trunc: ((n: number) => number) = (<any>Math).trunc || __truncPolyfill;

/**
 * Test whether a number is negative zero -0.
 * The equals and identity operators as all other operations including string conversion treat -0 like 0.
 * @param n the number to check
 * @returns true if and only if n is -0
 */
export function isMinusZero(n: number) {
	return n === 0 && 1 / n !== 1 / 0;
}

/**
 * Adjust number, so it fits into the given borders. If the given number is lower than the lower bound
 * (or greater than the upper bound), the bound is returned.
 * If a bound is undefined, this side is not adjusted. If the lower bound is greater than the upper bound,
 * the result is kind of unexpected, and always one of the bounds.
 * @param n the number to adjust
 * @param lower the lower bound or undefined if no lower bound is given
 * @param upper the upper bound or undefined if no upper bound is given
 * @returns the integer part
 */
export function adjust(n: number, lower: number | undefined, upper: number | undefined) {
	if (lower !== undefined && n < lower) {
		return lower;
	} else if (upper !== undefined && n > upper) {
		return upper;
	} else {
		return n;
	}
}

/**
 * Pad a string to have at least n characters. The c characters are appended in front (left) of the string
 * If the string is longer than the given length, it is returned without change.
 * @param s the string to pad. If empty, space is used instead. If longer than one char, it is truncated at the start.
 * @param c the character to pad
 * @param n the length of the resulting string
 */
export function padLeft(s: string, c: string, n: number): string {
	const r = n - s.length;
	let p = '';
	if (c === '') {
		c = ' ';
	}
	while (p.length < r) {
		p += c;
	}
	if (p.length > r) {
		p = p.substr(-r);
	}
	return p + s;
}

/**
 * Pad a string to have at least n characters. The c characters are appended at the end (right) of the string
 * If the string is longer than the given length, it is returned without change.
 * @param s the string to pad
 * @param c the character to pad. If empty, space is used instead. If longer than one char, it is truncated at the end.
 * @param n the length of the resulting string
 */
export function padRight(s: string, c: string, n: number): string {
	const r = n - s.length;
	let p = '';
	if (c === '') {
		c = ' ';
	}
	while (p.length < r) {
		p += c;
	}
	if (p.length > r) {
		p = p.substr(0, r);
	}
	return s + p;
}

/**
 * Pad a number with leading zeros to have at least n characters.
 * If the number is negative, the numbers absolute value is padded to one character less and a leading minus sign is added.
 * If the number string is already longer than the given length, it is returned without change.
 * @param s the number to pad.
 * @param n the length of the resulting string
 * @param handleMinusZero <default: false> flag indicating the use of minus zero -0: true treats it as negative number.
 */
export function padNumber(s: number, n: number, handleMinusZero?: boolean): string {
	const minusZero = handleMinusZero && isMinusZero(s);
	const neg = minusZero || s < 0;
	const abs = Math.abs(s);
	return (neg ? '-' : '') + padLeft(abs + '', '0', neg ? n - 1 : n);
}

/**
 * Check whether a string starts with another string.
 * @param st the number to trunc
 * @returns the integer part
 */
export function startsWith(str: string, start: string): boolean {
	const tl = str.length;
	const sl = start.length;
	return tl >= sl && (sl === 0 || str.substr(0, sl) === start);
}

/**
 * Check whether a string ends with another string.
 * @param n the number to trunc
 * @returns the integer part
 */
export function endsWith(str: string, end: string): boolean {
	const tl = str.length;
	const sl = end.length;
	return tl >= sl && (sl === 0 || str.substr(-sl) === end);
}

/**
 * Split string on delimiter. A delimiter can be delimited by backslash '\'
 * An empty delimiter will result in no split at all.
 * @param s the string to split
 * @param delimiter the string to split.
 * @returns array of delimited tokens.
 */
export function splitSimple(s: string, delim: string): string[] {
	if (s === '' || delim === '') {
		return [s];
	} else if (s.indexOf('\\') === -1) {
		return s.split(delim);
	}
	const dl = delim.length;
	const result = [];
	let part = '';
	let masked = false;
	for (let i = 0; i < s.length; i++) {
		const c = s.substr(i, 1);
		const cstart = s.substr(i, dl);
		if (masked) {
			masked = false;
			part += c;
		} else if (c === '\\') {
			masked = true;
		} else if (cstart === delim) {
			result.push(part);
			part = '';
			masked = false;
			i += dl - 1;
		} else {
			part += c;
		}
	}
	result.push(part);
	return result;
}

/**
 * Split well-formed string into parts with brakets.
 * Within the enclosed strings, the brakets will not be considered.
 * E.g. 'a+(b+(c+d))+(e+f)' will be split into 'a+', 'b+(c+d))', '+', '(e+f)'
 *
 * The resulting array will always start with an unenclosed part and have one unenclosed part between the enclosed ones.
 * These parts may be empty strings to provide a strict structure
 * E.g. '(b+(c+d))' will be split into '', 'b+(c+d))'
 * and '(b+(c+d))(e+f)' will be split into '', 'b+(c+d))', '', 'e+f'
 *
 * Alternative start delimiters can be used to mask end delimiter within the enclosed parts
 *
 * E.g. 'a${b:{c}}' with start '${' and end '}' needs alternative start '{' so the outmost closing bracket is found
 *
 * @param s The string to split
 * @param dstart The delimiter used as start of an enclosed section
 * @param dend The delimiter used as end of an enclosed section
 * @param altdstarts alternative start delimiter, that need to be matched to the end delimiter
 */
export function splitBracket(s: string, dstart: string, dend: string, altdstarts?: string[]): string[] {
	const sl = s.length;
	const dsl = dstart.length;
	const del = dend.length;
	if (sl === 0 || dsl === 0 || del === 0 || s.indexOf(dstart) === -1) {
		return [s];
	}
	const dstarts = altdstarts === undefined ? [dstart] : [...altdstarts, dstart];
	let depth = 0;
	const result = [];
	let part = '';
	for (let i = 0; i < sl; i++) {
		switch (depth) {
			case 0:
				// If the depth is 0, real splitting is done.
				if (s.substr(i, dsl) === dstart) {
					// A start is found, so the last part is terminated and the depth is increased
					result.push(part);
					part = '';
					depth++;
					i += dsl - 1;
				} else {
					// The current part is extended. Note that superfluous end delimiter are simply added as strings.
					part += s.substr(i, 1);
				}
				break;
			default:
				// If the depth is != 0, Everything is added to the current (enclosed) part
				if (s.substr(i, del) === dend) {
					// If the end delimiter is found, the depth is decreased. If 0 is reached, the current part is terminated
					depth--;
					if (depth === 0) {
						result.push(part);
						part = '';
					} else {
						// The current part is extended
						part += s.substr(i, del);
					}
					i += del - 1;
				} else {
					// All potential start delimiters are checked. If one is found, the depth is increased.
					let matchedlen = 0;
					for (let m = 0; m < dstarts.length; m++) {
						const l = dstarts[m].length;
						if (s.substr(i, l) === dstarts[m]) {
							matchedlen = l;
							break;
						}
					}
					if (matchedlen !== 0) {
						depth++;
						part += s.substr(i, matchedlen);
						i += matchedlen - 1;
					} else {
						part += s.substr(i, 1);
					}
				}
				break;
		}
	}
	result.push(part);
	return result;
}

/**
 * Return the nested child of an object.
 * @param object The object to process
 * @param key the path to process
 * @returns the value associated with the key after dereferencing.
 */
// tslint:disable-next-line: no-any // deref should work with any object
export function lookup(object: any, key: (string | number) | ((string | number)[])): any {
	let curObject = object;
	const keyArray = Array.isArray(key) ? key : splitSimple('' + key, '.');
	const last = keyArray.length - 1;
	for (let i = 0; i <= last - 1; i++) {
		if (typeof curObject !== 'object' || !curObject.hasOwnProperty(keyArray[i])) {
			return undefined;
		} else {
			curObject = curObject[keyArray[i]];
		}
	}
	if (typeof curObject !== 'object' || !curObject.hasOwnProperty(keyArray[last])) {
		return undefined;
	} else {
		return curObject[keyArray[last]];
	}
}

/**
 * Set the value of a nested child of an object.
 * @param object The object to process
 * @param key the path to process
 * @param the value associated with the key after dereferencing.
 */
// tslint:disable-next-line: no-any // deref should work with any object
export function overwrite(object: any, key: (string | number) | ((string | number)[]), value: any): void {
	let curObject = object;
	const keyArray = Array.isArray(key) ? key : splitSimple('' + key, '.');
	const last = keyArray.length - 1;
	for (let i = 0; i <= last - 1; i++) {
		if (typeof curObject !== 'object') {
			return;
		} else if (!curObject.hasOwnProperty(keyArray[i])) {
			if (/^([1-9][\d]*)|0$/.test('' + keyArray[i + 1])) {
				// next index is numeric, so we initialize an array
				curObject[keyArray[i]] = [];
			} else {
				curObject[keyArray[i]] = {};
			}
			curObject = curObject[keyArray[i]];
		} else {
			curObject = curObject[keyArray[i]];
		}
	}
	if (typeof curObject !== 'object') {
		return;
	} else if (Array.isArray(curObject)) {
		curObject[+keyArray[last]] = value;
	} else {
		curObject[keyArray[last]] = value;
	}
}
