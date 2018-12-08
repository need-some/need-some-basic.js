import { pit } from '@need-some/test';
import { padNumberLeft, padStringLeft, padStringRight, toUpperCase, firstToUpper } from '../../module/converter/tokenformatter';

describe('TokenFormatter', () => {
	const params = [
		{
			title: 'empty string',
			input: '',
			inputNumeric: false,
			padLen: 2,
			padString: ' ',
			locale: 'de',
			expected: { padNumberLeft: '', padStringLeft: '  ', padStringRight: '  ', toUpperCase: '', firstToUpper: '' }
		},
		{
			title: 'zero',
			input: '0',
			inputNumeric: true,
			padLen: 3,
			padString: ' ',
			locale: 'de',
			expected: { padNumberLeft: '000', padStringLeft: '  0', padStringRight: '0  ', toUpperCase: '0', firstToUpper: '0' }
		},
		{
			title: 'a string',
			input: 'abc',
			inputNumeric: false,
			padLen: 5,
			padString: '#',
			locale: 'en',
			expected: { padNumberLeft: '', padStringLeft: '##abc', padStringRight: 'abc##', toUpperCase: 'ABC', firstToUpper: 'Abc' }
		},
		{
			title: 'a negative number',
			input: '-23',
			inputNumeric: true,
			padLen: 4,
			padString: ' ',
			locale: 'en',
			expected: { padNumberLeft: '-023', padStringLeft: ' -23', padStringRight: '-23 ', toUpperCase: '-23', firstToUpper: '-23' }
		},
		{
			title: 'a long number',
			input: '1999',
			inputNumeric: true,
			padLen: 2,
			padString: '#',
			locale: 'en',
			expected: { padNumberLeft: '1999', padStringLeft: '1999', padStringRight: '1999', toUpperCase: '1999', firstToUpper: '1999' }
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
});
