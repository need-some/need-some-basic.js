import { Converter } from './converter';

/**
 * Dummy Converter that simply returns the object.
 * @param T The object type to create
 */
export class IdentityConverter<T> implements Converter<T, T> {
	/**
	 * Get newly created object.
	 * @param serialized the serialized variant.
	 * @return the newly created object.
	 */
	unmarshal(serialized: T): T {
		return serialized;
	}

	/**
	 * Get serialized variant.
	 *
	 * @param object the object to serialize.
	 * @return the serialized variant.
	 */
	marshal(object: T): T {
		return object;
	}
}
