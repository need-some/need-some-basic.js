import { IdentityConverter } from '../../module/converter/identity.converter';
import { dummyConverter } from './dummyconverter.mock.spec';

describe('IdentityConverter', () => {
	const sut = new IdentityConverter();
	it('should marshal defined value', () => {
		const result = sut.marshal('test');
		expect(result).toBe('test');
	});
	it('should marshal null', () => {
		const result = sut.marshal(null);
		expect(result).toBeNull();
	});
	it('should marshal undefined', () => {
		const result = sut.marshal(undefined);
		expect(result).toBeUndefined();
	});
	it('should unmarshal defined value', () => {
		const result = sut.unmarshal('test');
		expect(result).toBe('test');
	});
	it('should unmarshal null', () => {
		const result = sut.unmarshal(null);
		expect(result).toBeNull();
	});
	it('should unmarshal undefined', () => {
		const result = sut.unmarshal(undefined);
		expect(result).toBeUndefined();
	});
});
