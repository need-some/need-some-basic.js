/**
 * Converter from serialized (json) variant to object.
 * @param T The object type to create
 * @param S The serialized version. May denote an interface for structured json
 */
export interface Unmarshaller<T, S> {
	/**
	 * Get newly created object.
	 * @param serialized the serialized variant.
	 * @return the newly created object.
	 * @throws error if serialized object is not correct
	 */
	unmarshal(serialized: S): T;
}
