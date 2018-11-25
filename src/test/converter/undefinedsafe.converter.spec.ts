import { UndefinedSafeConverter } from '../../module/converter/undefinedsafe.converter';
import { dummyConverter } from './dummyconverter.mock.spec';

describe('UndefinedSafeConverter', () => {
	const sut = new UndefinedSafeConverter(dummyConverter);
	it('should marshal defined value', () => {
		const result = sut.marshal('test');
		expect(result).toBe('marshal test');
	});
	it('should marshal undefined', () => {
		const result = sut.marshal(undefined);
		expect(result).toBeUndefined();
	});
	it('should unmarshal defined value', () => {
		const result = sut.unmarshal('test');
		expect(result).toBe('unmarshal test');
	});
	it('should unmarshal undefined', () => {
		const result = sut.unmarshal(undefined);
		expect(result).toBeUndefined();
	});
});
