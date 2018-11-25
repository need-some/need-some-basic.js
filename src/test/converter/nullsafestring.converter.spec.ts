import { NullSafeStringConverter } from '../../module/converter/nullsafestring.converter';
import { dummyConverter } from './dummyconverter.mock.spec';

describe('NullSafeStringConverter', () => {
	const sut = new NullSafeStringConverter(dummyConverter);
	it('should marshal defined value', () => {
		const result = sut.marshal('test');
		expect(result).toBe('marshal test');
	});
	it('should marshal null', () => {
		const result = sut.marshal(null);
		expect(result).toBe('');
	});
	it('should unmarshal defined value', () => {
		const result = sut.unmarshal('test');
		expect(result).toBe('unmarshal test');
	});
	it('should unmarshal null', () => {
		const result = sut.unmarshal(null);
		expect(result).toBeNull();
	});
});
