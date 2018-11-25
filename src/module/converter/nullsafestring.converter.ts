import { Converter } from './converter';

/**
 * Converter from string or null to a given object. If null is unmarshalled, an empty string is returned.
 *
 * @param T The object type to create
 * @param S The serialized version. May denote an interface for structured json
 */
export class NullSafeStringConverter<T> implements Converter<T | null, string> {
	/**
	 * Construct a new converter instance.
	 * @param converter The converter to call after null check
	 */
	constructor(private converter: Converter<T, string>) {}

	/**
	 * Get newly created object.
	 * If an empty string is unmarshalled, null is returned.
	 * @param serialized the serialized variant.
	 * @return the newly created object.
	 */
	unmarshal(serialized: string): T | null {
		if (!serialized) {
			return null;
		}
		return this.converter.unmarshal(serialized);
	}

	/**
	 * Get serialized variant.
	 * If null is marshalled, an empty string is returned.
	 * @param object the object to serialize.
	 * @return the serialized variant.
	 */
	marshal(object: T | null): string {
		if (object === null) {
			return '';
		}
		return this.converter.marshal(object);
	}
}
