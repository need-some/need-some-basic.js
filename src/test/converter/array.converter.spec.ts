import { ArrayConverter } from '../../module/converter/array.converter';
import { dummyConverter } from './dummyconverter.mock.spec';

describe('ArrayConverter', () => {
	const sut = new ArrayConverter(dummyConverter);
	it('should marshal single value', () => {
		const result = sut.marshal(['test']);
		expect(result).toEqual(['marshal test']);
	});
	it('should marshal multiple values', () => {
		const result = sut.marshal(['test', 'test2']);
		expect(result).toEqual(['marshal test', 'marshal test2']);
	});
	it('should marshal empty array', () => {
		const result = sut.marshal([]);
		expect(result).toEqual([]);
	});
	it('should unmarshal single value', () => {
		const result = sut.unmarshal(['test']);
		expect(result).toEqual(['unmarshal test']);
	});
	it('should unmarshal multiple values', () => {
		const result = sut.unmarshal(['test', 'test2']);
		expect(result).toEqual(['unmarshal test', 'unmarshal test2']);
	});
	it('should unmarshal empty array', () => {
		const result = sut.unmarshal([]);
		expect(result).toEqual([]);
	});
});
