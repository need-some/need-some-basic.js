import { Converter } from './converter';

/**
 * Factory for creation of Converters.
 *
 * @param T The object type to marshal
 * @param S The serialized version. May denote an interface for structured json
 * @param C The parameter format
 */
export interface ConverterFactory<T, S, C> {
	/**
	 * Create converter instance for the given paramters.
	 *
	 * @param param the object to serialize.
	 * @return an converter instance.
	 */
	createConverter(param: C): Converter<T, S>;
}

export default ConverterFactory;
