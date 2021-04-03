import { dummyConverter, dummyConverterFactory } from './dummyconverter.mock.spec';
import Convertable from '../../module/converter/convertable';
import {Color, ColorConverter} from '../../module/types/color.type';
import { Constructor } from '../../module/types/constructor.type';

describe('Convertable', () => {
	it('simple converter', () => {
		const input = dummyConverter;
		const result = Convertable.createConverterInstance(input);
		expect(result.marshal('test')).toBe('marshal test');
	});
	it('converter provider', () => {
		const input = () => dummyConverter;
		const result = Convertable.createConverterInstance(input);
		expect(result.marshal('test')).toBe('marshal test');
	});
	it('converter factory', () => {
		const input = dummyConverterFactory;
		const result = Convertable.createConverterInstance(input);
		expect(result.marshal('test')).toBe('marshal test');
	});
	it('converter factory provider', () => {
		const input = () => dummyConverterFactory;
		const result = Convertable.createConverterInstance(input);
		expect(result.marshal('test')).toBe('marshal test');
	});
	it('converter factory factory', () => {
		const input = { factory: dummyConverterFactory };
		const result = Convertable.createConverterInstance(input);
		expect(result.marshal('test')).toBe('marshal test');
	});
	it('converter factory factory with params', () => {
		const input = { factory: dummyConverterFactory, params: ['two'] };
		const result = Convertable.createConverterInstance(input);
		expect(result.marshal('test')).toBe('marshal 2 test');
	});
	it('converter factory factory with changing params provider', () => {
		let p = 'one';
		const input = { factory: dummyConverterFactory, params: () => [p] };
		const result = Convertable.createConverterInstance(input);
		expect(result.marshal('test')).toBe('marshal test');
		p = 'two';
		const result2 = Convertable.createConverterInstance(input);
		expect(result2.marshal('test')).toBe('marshal 2 test');
	});
});
