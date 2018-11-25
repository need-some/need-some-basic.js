import { Unmarshaller } from './unmarshaller';
import { Marshaller } from './marshaller';
import { Converter } from './converter';
import { MarshallerFactory } from './marshaller.factory';
import { UnmarshallerFactory } from './unmarshaller.factory';
import { ConverterFactory } from './converter.factory';

/**
 * Factory for common converter factories.
 */

/**
 * Wrap a marshaller
 * @param instance the marshaller that is wrapped
 * @returns marshaller factory
 */
export function wrapMarshaller<T, S>(instance: Marshaller<T, S>): MarshallerFactory<T, S, undefined> {
	return {
		createMarshaller() {
			return instance;
		}
	};
}

/**
 * Wrap an unmarshaller
 * @param instance the unmarshaller that is wrapped
 * @returns unmarshaller factory
 */
export function wrapUnmarshaller<T, S>(instance: Unmarshaller<T, S>): UnmarshallerFactory<T, S, undefined> {
	return {
		createUnmarshaller() {
			return instance;
		}
	};
}

/**
 * Wrap a converter
 * @param instance the converter that is wrapped
 * @returns converter factory
 */
export function wrapConverter<T, S>(instance: Converter<T, S>): ConverterFactory<T, S, undefined> {
	return {
		createConverter() {
			return instance;
		}
	};
}
