import { dummyConverter } from './dummyconverter.mock.spec';
import { wrapConverter, wrapUnmarshaller, wrapMarshaller } from '../../module/converter/converterfactories';

describe('ConverterFactories', () => {
	it('wrap marshaller', () => {
		const result = wrapMarshaller(dummyConverter);
		expect(result.createMarshaller(undefined).marshal('test')).toBe('marshal test');
	});
	it('wrap unmarshaller', () => {
		const result = wrapUnmarshaller(dummyConverter);
		expect(result.createUnmarshaller(undefined).unmarshal('test')).toBe('unmarshal test');
	});
	it('wrap converter', () => {
		const result = wrapConverter(dummyConverter);
		expect(result.createConverter(undefined).marshal('test')).toBe('marshal test');
		expect(result.createConverter(undefined).unmarshal('test')).toBe('unmarshal test');
	});
});
