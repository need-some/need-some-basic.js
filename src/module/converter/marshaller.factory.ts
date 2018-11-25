import { Marshaller } from './marshaller';

/**
 * Factory for creation of Marshallers.
 *
 * @param T The object type to marshal
 * @param S The serialized version. May denote an interface for structured json
 * @param C The parameter format
 */
export interface MarshallerFactory<T, S, C> {
	/**
	 * Create marshaller instance for the given paramters.
	 *
	 * @param param the object to serialize.
	 * @return a marshaller instance.
	 */
	createMarshaller(param: C): Marshaller<T, S>;
}
