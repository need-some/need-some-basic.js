import { pit } from '@need-some/test';
import { padNumberLeft, padStringLeft, padStringRight, toUpperCase, firstToUpper, toInverseCase, firstToInverse, concat, StringTokenFormat } from '../../module/converter/tokenformatter';

describe('TokenFormatter', () => {
	const params = [
		{
			title: 'empty string',
			input: '',
			inputNumeric: false,
			padLen: 2,
			padString: ' ',
			locale: 'de',
			expected: { padNumberLeft: '', padStringLeft: '  ', padStringRight: '  ', toUpperCase: '', firstToUpper: '', inverse: '', concat: 'AaAa', concatNumber: '' }
		},
		{
			title: 'zero',
			input: '0',
			inputNumeric: true,
			padLen: 3,
			padString: ' ',
			locale: 'de',
			expected: { padNumberLeft: '000', padStringLeft: '  0', padStringRight: '0  ', toUpperCase: '0', firstToUpper: '0', inverse: '0', concat: 'Aa0Aa', concatNumber: '#####0' }
		},
		{
			title: 'a string',
			input: 'abc',
			inputNumeric: false,
			padLen: 5,
			padString: '#',
			locale: 'en',
			expected: { padNumberLeft: '', padStringLeft: '##abc', padStringRight: 'abc##', toUpperCase: 'ABC', firstToUpper: 'Abc', inverse: 'ABC', concat: 'AaABCAa', concatNumber: '' }
		},
		{
			title: 'a mixed case string',
			input: 'abcDef',
			inputNumeric: false,
			padLen: 7,
			padString: '#',
			locale: 'en',
			expected: { padNumberLeft: '', padStringLeft: '#abcDef', padStringRight: 'abcDef#', toUpperCase: 'ABCDEF', firstToUpper: 'AbcDef', inverse: 'ABCdEF', concat: 'AaABCdEFAa', concatNumber: '' }
		},
		{
			title: 'a negative number',
			input: '-23',
			inputNumeric: true,
			padLen: 4,
			padString: ' ',
			locale: 'en',
			expected: { padNumberLeft: '-023', padStringLeft: ' -23', padStringRight: '-23 ', toUpperCase: '-23', firstToUpper: '-23', inverse: '-23', concat: 'Aa-23Aa', concatNumber: '####23' }
		},
		{
			title: 'a long number',
			input: '1999',
			inputNumeric: true,
			padLen: 2,
			padString: '#',
			locale: 'en',
			expected: { padNumberLeft: '1999', padStringLeft: '1999', padStringRight: '1999', toUpperCase: '1999', firstToUpper: '1999', inverse: '1999', concat: 'Aa1999Aa', concatNumber: '#-1999' }
		}
	];
	pit('should format ${title} with padNumberLeft', params.filter(p => p.inputNumeric), param => {
		const sut = padNumberLeft(param.padLen);
		const result = sut(+param.input);
		expect(result).toBe(param.expected.padNumberLeft);
	});
	pit('should format ${title} with padStringLeft', params, param => {
		const sut = padStringLeft(param.padString, param.padLen);
		const result = sut(param.input);
		expect(result).toBe(param.expected.padStringLeft);
	});
	pit('should format ${title} with padStringRight', params, param => {
		const sut = padStringRight(param.padString, param.padLen);
		const result = sut(param.input);
		expect(result).toBe(param.expected.padStringRight);
	});
	pit('should format ${title} with toUpperCase', params, param => {
		const sut = toUpperCase(param.locale);
		const result = sut(param.input);
		expect(result).toBe(param.expected.toUpperCase);
	});
	pit('should format ${title} with firstToUpper', params, param => {
		const sut = firstToUpper(param.locale);
		const result = sut(param.input);
		expect(result).toBe(param.expected.firstToUpper);
	});
	pit('should format ${title} with toInverseCase', params, param => {
		const sut = toInverseCase(param.locale);
		const result = sut(param.input);
		expect(result).toBe(param.expected.inverse);
	});
	pit('should format ${title} with concat', params, param => {
		const wrap = (s: string) => ("a" + s + "a");
		const sut = concat(wrap, firstToUpper(param.locale), toInverseCase(param.locale), wrap, firstToInverse(param.locale));
		const result = sut(param.input);
		expect(result).toBe(param.expected.concat);
	});
	pit('should format ${title} with number concat', params.filter(p => p.inputNumeric), param => {
		const wrap = (n: number) => ("" + (-n));
		const sut = concat(wrap, padStringLeft('#', 6));
		const result = sut(+param.input);
		expect(result).toBe(param.expected.concatNumber);
	});
});
