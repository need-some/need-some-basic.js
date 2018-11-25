import { Converter } from './converter';

/**
 * Converter from array to array and back. Each array item is marshalled/unmarshalled using the given converter
 * @param T The object type to create
 * @param S The serialized version. May denote an interface for structured json
 */
export class ArrayConverter<T, S> implements Converter<T[], S[]> {
	/**
	 * Construct a new converter instance.
	 * @param converter The converter to call for each array item.
	 */
	constructor(private converter: Converter<T, S>) {}

	/**
	 * Get newly created object.
	 * @param serialized the serialized variant.
	 * @return the newly created object.
	 */
	unmarshal(serialized: S[]): T[] {
		return serialized.map(this.converter.unmarshal);
	}

	/**
	 * Get serialized variant.
	 *
	 * @param object the object to serialize.
	 * @return the serialized variant.
	 */
	marshal(object: T[]): S[] {
		return object.map(this.converter.marshal);
	}
}
