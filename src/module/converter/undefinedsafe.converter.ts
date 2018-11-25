import { Converter } from './converter';

/**
 * Converter that allows undefined. If undefined is marshalled/unmarshalled, undefined is returned.
 * @param T The object type to create
 * @param S The serialized version. May denote an interface for structured json
 */
export class UndefinedSafeConverter<T, S> implements Converter<T | undefined, S | undefined> {
	/**
	 * Construct a new converter instance.
	 * @param converter The converter to call after undefined check
	 */
	constructor(private converter: Converter<T, S>) {}

	/**
	 * Get newly created object.
	 * If undefined is unmarshalled, undefined is returned.
	 * @param serialized the serialized variant.
	 * @return the newly created object.
	 */
	unmarshal(serialized: S | undefined) {
		if (serialized === undefined) {
			return undefined;
		}
		return this.converter.unmarshal(serialized);
	}

	/**
	 * Get serialized variant.
	 * If undefined is marshalled, undefined is returned.
	 * @param object the object to serialize.
	 * @return the serialized variant.
	 */
	marshal(object: T | undefined) {
		if (object === undefined) {
			return undefined;
		}
		return this.converter.marshal(object);
	}
}
