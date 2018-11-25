import { Converter } from './converter';

/**
 * Converter that allows null. If null is marshalled/unmarshalled, null is returned.
 * @param T The object type to create
 * @param S The serialized version. May denote an interface for structured json
 */
export class NullSafeConverter<T, S> implements Converter<T | null, S | null> {
	/**
	 * Construct a new converter instance.
	 * @param converter The converter to call after null check
	 */
	constructor(private converter: Converter<T, S>) {}

	/**
	 * Get newly created object.
	 * If null is unmarshalled, null is returned.
	 * @param serialized the serialized variant.
	 * @return the newly created object.
	 */
	unmarshal(serialized: S | null) {
		if (serialized === null) {
			return null;
		}
		return this.converter.unmarshal(serialized);
	}

	/**
	 * Get serialized variant.
	 * If null is marshalled, null is returned.
	 * @param object the object to serialize.
	 * @return the serialized variant.
	 */
	marshal(object: T | null) {
		if (object === null) {
			return null;
		}
		return this.converter.marshal(object);
	}
}
