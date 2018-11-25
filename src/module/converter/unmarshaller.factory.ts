import { Unmarshaller } from './unmarshaller';

/**
 * Factory for creation of Unmarshallers.
 *
 * @param T The object type to marshal
 * @param S The serialized version. May denote an interface for structured json
 * @param C The parameter format
 */
export interface UnmarshallerFactory<T, S, C> {
	/**
	 * Create unmarshaller instance for the given paramters.
	 *
	 * @param param the object to serialize.
	 * @return an unmarshaller instance.
	 */
	createUnmarshaller(param: C): Unmarshaller<T, S>;
}
