import { Converter } from './converter';
import { ConversionError } from './conversion.error';

/**
 * Converter from string to an enum.
 *
 * @param T The enum type to create
 */
export class EnumStringConverter<T> implements Converter<T, string> {
	/**
	 * Construct a new converter instance.
	 * @param converter The converter to call after null check
	 */
	// tslint:disable-next-line: no-any // enum has no common supertype
	constructor(private type: any) {}

	/**
	 * Get newly created object.
	 * If an empty string is unmarshalled, null is returned.
	 * @param serialized the serialized variant.
	 * @return the newly created object.
	 */
	unmarshal(serialized: string): T {
		const result = this.type[serialized];
		if (result === undefined) {
			throw new ConversionError('cannot parse enum string', serialized);
		}
		return result;
	}

	/**
	 * Get serialized variant.
	 * If null is marshalled, an empty string is returned.
	 * @param object the object to serialize.
	 * @return the serialized variant.
	 */
	marshal(object: T): string {
		return Object.keys(this.type).filter(key => this.type[key] === object)[0];
	}
}
