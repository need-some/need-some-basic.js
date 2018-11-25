/**
 * Converter from object to serialized (json) variant.
 *
 * @param T The object type to marshal
 * @param S The serialized version. May denote an interface for structured json
 */
export interface Marshaller<T, S> {
	/**
	 * Get serialized variant. Marshalling is not expected
	 * to throw errors. Every object of the given type needs to be technically
	 * serializable.
	 *
	 * @param object the object to serialize.
	 * @return the serialized variant.
	 */
	marshal(object: T): S;
}
