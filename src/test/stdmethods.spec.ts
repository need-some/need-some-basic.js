import { pit } from '@need-some/test';
import {
	padLeft,
	padRight,
	trunc,
	__truncPolyfill,
	startsWith,
	lookup,
	splitSimple,
	splitBracket,
	overwrite,
	endsWith,
	adjust,
	padNumber
} from '../module/stdmethods';

describe('StdMethods.padLeft', () => {
	const params = [
		{ title: 'keep exact string', input: 'testit', char: 'x', len: 6, expected: 'testit' },
		{ title: 'keep long string', input: 'testlong', char: 'x', len: 6, expected: 'testlong' },
		{ title: 'pad short string', input: 'test', char: 'x', len: 6, expected: 'xxtest' },
		{ title: 'pad empty string', input: '', char: 'x', len: 6, expected: 'xxxxxx' },
		{ title: 'keep string when no padding', input: 'testit', char: 'x', len: 0, expected: 'testit' },
		{ title: 'keep string when negative padding', input: 'testit', char: 'x', len: -1, expected: 'testit' },
		{ title: 'pad space when no char', input: 'test', char: '', len: 6, expected: '  test' },
		{ title: 'pad multiple chars', input: 'test', char: 'ab', len: 8, expected: 'ababtest' },
		{ title: 'pad multiple chars not exact', input: 'test', char: 'ab', len: 9, expected: 'bababtest' }
	];
	pit('should ${title}', params, param => {
		const result = padLeft(param.input, param.char, param.len);
		expect(result).toBe(param.expected);
	});
});

describe('StdMethods.padRight', () => {
	const params = [
		{ title: 'keep exact string', input: 'testit', char: 'x', len: 6, expected: 'testit' },
		{ title: 'keep long string', input: 'testlong', char: 'x', len: 6, expected: 'testlong' },
		{ title: 'pad short string', input: 'test', char: 'x', len: 6, expected: 'testxx' },
		{ title: 'pad empty string', input: '', char: 'x', len: 6, expected: 'xxxxxx' },
		{ title: 'keep string when no padding', input: 'testit', char: 'x', len: 0, expected: 'testit' },
		{ title: 'keep string when negative padding', input: 'testit', char: 'x', len: -1, expected: 'testit' },
		{ title: 'pad space when no char', input: 'test', char: '', len: 6, expected: 'test  ' },
		{ title: 'pad multiple chars', input: 'test', char: 'ab', len: 8, expected: 'testabab' },
		{ title: 'pad multiple chars not exact', input: 'test', char: 'ab', len: 9, expected: 'testababa' }
	];
	pit('should ${title}', params, param => {
		const result = padRight(param.input, param.char, param.len);
		expect(result).toBe(param.expected);
	});
});

describe('StdMethods.padNumber', () => {
	const params = [
		{ title: 'keep exact number', input: 456789, len: 6, expected: '456789' },
		{ title: 'keep exact negative number', input: -45678, len: 6, expected: '-45678' },
		{ title: 'keep long number', input: 4567890, len: 6, expected: '4567890' },
		{ title: 'keep long negative number', input: -4567890, len: 6, expected: '-4567890' },
		{ title: 'pad short number', input: 456, len: 6, expected: '000456' },
		{ title: 'pad short negative number', input: -456, len: 6, expected: '-00456' },
		{ title: 'pad null number', input: 0, len: 6, expected: '000000' },
		{ title: 'keep number when no padding', input: 123, len: 0, expected: '123' },
		{ title: 'keep number when negative padding', input: -123, len: -1, expected: '-123' },
	];
	pit('should ${title}', params, param => {
		const result = padNumber(param.input, param.len);
		expect(result).toBe(param.expected);
	});
});



describe('StdMethods.trunc', () => {
	const params = [
		{ input: 0, expected: 0 },
		{ input: 123, expected: 123 },
		{ input: 123.3, expected: 123 },
		{ input: 456.7, expected: 456 },
		{ input: -123.3, expected: -123 },
		{ input: -456.7, expected: -456 },
		{ input: -456, expected: -456 }
	];
	pit(param => `Math.trunc should trunc ${param.input}`, params, param => {
		const result = trunc(param.input);
		expect(result).toBe(param.expected);
	});
	pit(param => `polyfill method should trunc ${param.input}`, params, param => {
		const result = __truncPolyfill(param.input);
		expect(result).toBe(param.expected);
	});
});

describe('StdMethods.startsWith', () => {
	const params = [
		{ title: 'exact string', input: 'testit', param: 'testit', expected: true },
		{ title: 'longer string', input: 'testit and more', param: 'testit', expected: true },
		{ title: 'empty input', input: '', param: 'testit', expected: false },
		{ title: 'empty search', input: 'testit and more', param: '', expected: true },
		{ title: 'identical empty string', input: '', param: '', expected: true },
		{ title: 'short string', input: 'test', param: 'testit', expected: false },
		{ title: 'different string', input: 'testit', param: 'testother', expected: false }
	];
	pit('should confirm ${title}', params.filter(param => param.expected), param => {
		const result = startsWith(param.input, param.param);
		expect(result).toBeTruthy();
	});
	pit('should reject ${title}', params.filter(param => !param.expected), param => {
		const result = startsWith(param.input, param.param);
		expect(result).toBeFalsy();
	});
});

describe('StdMethods.endsWith', () => {
	const params = [
		{ title: 'exact string', input: 'testit', param: 'testit', expected: true },
		{ title: 'longer string', input: 'testit and more', param: 'and more', expected: true },
		{ title: 'empty input', input: '', param: 'testit', expected: false },
		{ title: 'empty search', input: 'testit and more', param: '', expected: true },
		{ title: 'identical empty string', input: '', param: '', expected: true },
		{ title: 'short string', input: 'test', param: 'ittest', expected: false },
		{ title: 'different string', input: 'testit', param: 'testother', expected: false }
	];
	pit('should confirm ${title}', params.filter(param => param.expected), param => {
		const result = endsWith(param.input, param.param);
		expect(result).toBeTruthy();
	});
	pit('should reject ${title}', params.filter(param => !param.expected), param => {
		const result = endsWith(param.input, param.param);
		expect(result).toBeFalsy();
	});
});

describe('StdMethods.splitSimple', () => {
	const params = [
		{ title: 'empty string', s: '', d: '.', expected: [''] },
		{ title: 'simple string', s: 'abc', d: '.', expected: ['abc'] },
		{ title: 'string with char delimiter', s: 'abc.def', d: '.', expected: ['abc', 'def'] },
		{ title: 'string with empty delimiter', s: 'abc.def', d: '', expected: ['abc.def'] },
		{ title: 'string with only masked delimiter', s: 'abc\\.def\\.ghi', d: '.', expected: ['abc.def.ghi'] },
		{ title: 'string with masked mask', s: 'abc\\\\.def\\.ghi', d: '.', expected: ['abc\\', 'def.ghi'] },
		{ title: 'string with masked mask and extra mask', s: 'abc\\\\\\.def\\.ghi', d: '.', expected: ['abc\\.def.ghi'] },
		{ title: 'string with masked and regular delimiter', s: 'abc\\.def\\.ghi.jkl.mno', d: '.', expected: ['abc.def.ghi', 'jkl', 'mno'] },
		{ title: 'simple string', s: 'abc', d: '<a>', expected: ['abc'] },
		{ title: 'string with long delimiter', s: 'abc<a>def', d: '<a>', expected: ['abc', 'def'] },
		{ title: 'string with only masked long delimiter', s: 'abc\\<a>def\\<a>ghi', d: '<a>', expected: ['abc<a>def<a>ghi'] },
		{
			title: 'string with masked and regular long delimiter',
			s: 'abc\\<a>def\\<a>ghi<a>jkl<a>mno',
			d: '<a>',
			expected: ['abc<a>def<a>ghi', 'jkl', 'mno']
		}
	];
	pit('should split ${title}', params, param => {
		const result = splitSimple(param.s, param.d);
		expect(result.join('|')).toBe(param.expected.join('|'));
	});
});

describe('StdMethods.lookup', () => {
	const params = [
		{ title: 'single key', input: { a: 1 }, key: ['a'], expected: 1 },
		{ title: 'scalar key', input: { a: 1 }, key: 'a', expected: 1 },
		{ title: 'single empty key', input: { a: 1, '': 2 }, key: [''], expected: 2 },
		{ title: 'single numeric key', input: { '1': 1, '3': 3 }, key: [3], expected: 3 },
		{ title: 'scalar numeric key', input: { '1': 1, '3': 3 }, key: 3, expected: 3 },
		{ title: 'single complex key', input: { 'a.b': 1, 'a.c': 3 }, key: ['a.c'], expected: 3 },
		{ title: 'single array index', input: ['a', 'b'], key: [1], expected: 'b' },
		{ title: 'single array string index', input: ['a', 'b'], key: ['1'], expected: 'b' },
		{ title: 'nested key', input: { a: { b: 2 } }, key: ['a', 'b'], expected: 2 },
		{ title: 'nested complex key', input: { 'a.b': { 'b.b': 2 } }, key: ['a.b', 'b.b'], expected: 2 },
		{ title: 'nested complex path', input: { 'a.b': { 'b.b': 2 } }, key: 'a\\.b.b\\.b', expected: 2 },
		{ title: 'nested array index', input: { a: [{ b: 1 }, { b: 2 }] }, key: ['a', 1, 'b'], expected: 2 },
		{ title: 'nested array index path', input: { a: [{ b: 1 }, { b: 2 }] }, key: 'a.1.b', expected: 2 },
		{
			title: 'deeply nested',
			input: [null, { a: [{ b: 1 }, { b: [[0], [{ c: 1 }, { c: 3 }]] }] }],
			key: [1, 'a', 1, 'b', 1, 1, 'c'],
			expected: 3
		},
		{ title: 'undefined key', input: { a: { b: 2 } }, key: ['b'], expected: undefined },
		{ title: 'undefined nested path', input: { a: { b: { c: 3 } } }, key: ['a', 'c'], expected: undefined },
		{ title: 'undefined nested path part', input: { a: { b: { c: 3 } } }, key: ['a', 'c', 'd'], expected: undefined },
		{ title: 'undefined leaf key', input: { a: { b: 2 } }, key: ['a', 'c'], expected: undefined },
		{ title: 'dereference primitive', input: { a: { b: 2 } }, key: ['a', 'b', 'c'], expected: undefined },
		{ title: 'dereference primitive path', input: { a: { b: 2 } }, key: ['a', 'b', 'c', 'd'], expected: undefined },
		{
			title: 'recursive object',
			input: { a: { b: { c: [{ d: 2 }] } } },
			key: ['a', 'b', 'c', 1, 'b', 'c', 1, 'b', 'c', 0, 'd'],
			expected: 2
		}
	];
	//insert cycle into input of one test
	params.filter(p => p.title === 'recursive object').forEach(p => (<any>p.input).a.b.c.push((<any>p.input).a));
	pit('should lookup ${title}', params.filter(p => p.expected !== undefined), param => {
		const result = lookup(param.input, param.key);
		expect(result).toBe(param.expected);
	});
	pit('should fail on ${title}', params.filter(p => p.expected === undefined), param => {
		const result = lookup(param.input, param.key);
		expect(result).toBeUndefined();
	});
});

describe('StdMethods.overwrite', () => {
	const params = [
		{ title: 'single key', input: { a: 1 }, key: ['a'], value: 2, expected: { a: 2 } },
		{ title: 'single new key', input: { a: 1 }, key: ['b'], value: 2, expected: { a: 1, b: 2 } },
		{ title: 'scalar key', input: { a: 1 }, key: 'a', value: 2, expected: { a: 2 } },
		{ title: 'single empty key', input: { a: 1, '': 2 }, key: [''], value: 3, expected: { a: 1, '': 3 } },
		{ title: 'single numeric key', input: { '1': 1, '3': 3 }, key: [3], value: 4, expected: { '1': 1, '3': 4 } },
		{ title: 'single numeric new key', input: { '1': 1, '3': 3 }, key: [2], value: 2, expected: { '1': 1, '2': 2, '3': 3 } },
		{ title: 'scalar numeric key', input: { '1': 1, '3': 3 }, key: 3, value: 4, expected: { '1': 1, '3': 4 } },
		{ title: 'single complex key', input: { 'a.b': 1, 'a.c': 3 }, key: ['a.c'], value: 4, expected: { 'a.b': 1, 'a.c': 4 } },
		{ title: 'single array index', input: ['a', 'b'], key: [1], value: 'c', expected: ['a', 'c'] },
		{ title: 'single array string index', input: ['a', 'b'], key: ['1'], value: 'c', expected: ['a', 'c'] },
		{ title: 'nested key', input: { a: { b: 2 } }, key: ['a', 'b'], value: 3, expected: { a: { b: 3 } } },
		{ title: 'nested complex key', input: { 'a.b': { 'b.b': 2 } }, key: ['a.b', 'b.b'], value: 3, expected: { 'a.b': { 'b.b': 3 } } },
		{ title: 'nested complex path', input: { 'a.b': { 'b.b': 2 } }, key: 'a\\.b.b\\.b', value: 3, expected: { 'a.b': { 'b.b': 3 } } },
		{
			title: 'nested array index',
			input: { a: [{ b: 1 }, { b: 2 }] },
			key: ['a', 1, 'b'],
			value: 3,
			expected: { a: [{ b: 1 }, { b: 3 }] }
		},
		{ title: 'nested array index path', input: { a: [{ b: 1 }, { b: 2 }] }, key: 'a.1.b', value: 3, expected: { a: [{ b: 1 }, { b: 3 }] } },
		{
			title: 'deeply nested',
			input: [null, { a: [{ b: 1 }, { b: [[0], [{ c: 1 }, { c: 3 }]] }] }],
			key: [1, 'a', 1, 'b', 1, 1, 'c'],
			value: 4,
			expected: [null, { a: [{ b: 1 }, { b: [[0], [{ c: 1 }, { c: 4 }]] }] }]
		},
		{ title: 'undefined key', input: { a: { b: 2 } }, key: ['b'], value: 3, expected: { a: { b: 2 }, b: 3 } },
		{ title: 'undefined nested path', input: { a: { b: { c: 3 } } }, key: ['a', 'c'], value: 4, expected: { a: { b: { c: 3 }, c: 4 } } },
		{
			title: 'undefined nested path part',
			input: { a: { b: { c: 3 } } },
			key: ['a', 'c', 'd'],
			value: 4,
			expected: { a: { b: { c: 3 }, c: { d: 4 } } }
		},
		{
			title: 'undefined nested array path part',
			input: { a: { b: { c: 3 } } },
			key: ['a', 'c', 0, 'd'],
			value: 4,
			expected: { a: { b: { c: 3 }, c: [{ d: 4 }] } }
		},
		{ title: 'undefined leaf key', input: { a: { b: 2 } }, key: ['a', 'c'], value: 3, expected: { a: { b: 2, c: 3 } } },
		{ title: 'dereference primitive', input: { a: { b: 2 } }, key: ['a', 'b', 'c'], value: 5, expected: { a: { b: 2 } } },
		{ title: 'dereference primitive path', input: { a: { b: 2 } }, key: ['a', 'b', 'c', 'd'], value: 5, expected: { a: { b: 2 } } },
		{
			title: 'recursive object',
			input: { a: { b: { c: [{ d: 2 }] } } },
			key: ['a', 'b', 'c', 1, 'b', 'c', 1, 'b', 'c', 0, 'd'],
			value: 4,
			expected: { a: { b: { c: [{ d: 4 }, 'cycle'] } } }
		}
	];
	pit('should overwrite ${title}', params, param => {
		const result = JSON.parse(JSON.stringify(param.input));
		// insert cycle into input of one test
		if (param.title === 'recursive object') {
			(<any>result).a.b.c.push((<any>result).a);
		}
		overwrite(result, param.key, param.value);
		// remove cycle from input of one test
		if (param.title === 'recursive object') {
			(<any>result).a.b.c[1] = 'cycle';
		}
		expect(JSON.stringify(result)).toBe(JSON.stringify(param.expected));
	});
});

describe('StdMethods.splitBracket', () => {
	const params = [
		{ title: 'empty string', s: '', ds: '<', de: '>', expected: [''] },
		{ title: 'empty delim', s: 'abc', ds: '', de: '>', expected: ['abc'] },
		{ title: 'string with char delimiter', s: 'abc<def>', ds: '<', de: '>', expected: ['abc', 'def', ''] },
		{ title: 'string with nested delimiter', s: 'abc<d<e>f>', ds: '<', de: '>', expected: ['abc', 'd<e>f', ''] },
		{ title: 'string with multiple delimiter', s: 'abc<d<e>f><ghi>', ds: '<', de: '>', expected: ['abc', 'd<e>f', '', 'ghi', ''] },
		{ title: 'string with complex delimiter', s: 'abc${d${e}f}', ds: '${', de: '}', expected: ['abc', 'd${e}f', ''] },
		{ title: 'string with multiple delimiter', s: 'abc${d${e}f}${ghi}', ds: '${', de: '}', expected: ['abc', 'd${e}f', '', 'ghi', ''] },
		{
			title: 'string with nested alternativedelimiter',
			s: 'abc${d${e{2}}f}${ghi}',
			ds: '${',
			de: '}',
			da: ['{'],
			expected: ['abc', 'd${e{2}}f', '', 'ghi', '']
		}
	];
	pit('should split ${title}', params, param => {
		const result = splitBracket(param.s, param.ds, param.de, (<any>param).da);
		expect(result.join('|')).toBe(param.expected.join('|'));
	});
});
describe('StdMethods.cap', () => {
	const params = [
		{ input: 50, lower: 0, upper: 100, expected: 50 },
		{ input: 150, lower: 0, upper: 100, expected: 100 },
		{ input: -50, lower: 0, upper: 100, expected: 0 },
		{ input: -50, lower: undefined, upper: 100, expected: -50 },
		{ input: 150, lower: 0, upper: undefined, expected: 150 },
		{ input: 50, lower: undefined, upper: undefined, expected: 50 }
	];
	pit(
		p =>
			'should ' +
			(p.expected === p.input ? 'keep' : 'correct') +
			' ' +
			(p.lower === undefined ? '' : p.lower + '<=') +
			p.input +
			(p.upper === undefined ? '' : '<=' + p.upper),
		params,
		param => {
			const result = adjust(param.input, param.lower, param.upper);
			expect(result).toBe(param.expected);
		}
	);
});
