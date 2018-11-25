import { NullSafeConverter } from '../../module/converter/nullsafe.converter';
import { dummyConverter } from './dummyconverter.mock.spec';

describe('NullSafeConverter', () => {
	const sut = new NullSafeConverter(dummyConverter);
	it('should marshal defined value', () => {
		const result = sut.marshal('test');
		expect(result).toBe('marshal test');
	});
	it('should marshal null', () => {
		const result = sut.marshal(null);
		expect(result).toBeNull();
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
