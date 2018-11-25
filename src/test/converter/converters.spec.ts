import { dummyConverter } from './dummyconverter.mock.spec';
import {
	nullsafe,
	undefinedsafe,
	nullsafestring,
	map,
	marshal,
	unmarshal,
	convert,
	identity,
	swap
} from '../../module/converter/converters';

describe('Converters', () => {
	it('create nullsafe instance', () => {
		const result = nullsafe(dummyConverter);
		expect(result.marshal('test')).toBe('marshal test');
		expect(result.marshal(null)).toBeNull();
	});
	it('reuse nullsafe instance', () => {
		const instance = nullsafe(dummyConverter);
		(<any>instance).flag = true;
		const result = nullsafe(instance);
		expect(result.marshal('test')).toBe('marshal test');
		expect(result.marshal(null)).toBeNull();
		expect((<any>result).flag).toBeTruthy();
	});
	it('create nullsafestring instance', () => {
		const result = nullsafestring(dummyConverter);
		expect(result.marshal('test')).toBe('marshal test');
		expect(result.marshal(null)).toBe('');
	});
	it('reuse nullsafestring instance', () => {
		const instance = nullsafestring(dummyConverter);
		(<any>instance).flag = true;
		const result = nullsafestring(instance);
		expect(result.marshal('test')).toBe('marshal test');
		expect(result.marshal(null)).toBe('');
		expect((<any>result).flag).toBeTruthy();
	});
	it('create undefinedsafe instance', () => {
		const result = undefinedsafe(dummyConverter);
		expect(result.marshal('test')).toBe('marshal test');
		expect(result.marshal(undefined)).toBeUndefined();
	});
	it('reuse undefinedsafe instance', () => {
		const instance = undefinedsafe(dummyConverter);
		(<any>instance).flag = true;
		const result = undefinedsafe(instance);
		expect(result.marshal('test')).toBe('marshal test');
		expect(result.marshal(undefined)).toBeUndefined();
		expect((<any>result).flag).toBeTruthy();
	});
	it('create identity instance', () => {
		const result = identity();
		expect(result.marshal('test2')).toBe('test2');
	});
	it('create map instance', () => {
		const result = map(dummyConverter);
		expect(result.marshal(['test', 'test2'])).toEqual(['marshal test', 'marshal test2']);
	});
	it('throw error', () => {
		expect(() => dummyConverter.unmarshal('throw')).toThrowError('illegal string: throw');
		try {
			dummyConverter.unmarshal('throw');
		} catch (e) {
			expect(e.messageDescription).toBe('illegal string');
			expect(e.value).toBe('throw');
		}
	});
	it('forward error in map', () => {
		const result = map(dummyConverter);
		expect(() => result.unmarshal(['test', 'throw'])).toThrowError('illegal string: throw');
	});
	it('create swapped instance', () => {
		const result = swap(dummyConverter);
		expect(result.marshal('test')).toBe('unmarshal test');
		expect(result.unmarshal('test')).toBe('marshal test');
	});
	it('create arrow marshaller', () => {
		const result = marshal((b: boolean) => (b ? 'aye' : 'nay'));
		expect(result.marshal(true)).toBe('aye');
	});
	it('create arrow unmarshaller', () => {
		const result = unmarshal((s: string) => s === 'aye');
		expect(result.unmarshal('aye')).toBeTruthy();
	});
	it('create arrow converter', () => {
		const result = convert((b: boolean) => (b ? 'aye' : 'nay'), (s: string) => s === 'aye');
		expect(result.marshal(true)).toBe('aye');
		expect(result.unmarshal('aye')).toBeTruthy();
	});
});
