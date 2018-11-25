/**
 * Error while converting a serialized version
 * @param T the type of converted object
 */
export class ConversionError<T> extends Error {
	/**
	 * Create a conversion error object.
	 * @param messageDescription The error description
	 * @param value the offending value
	 */
	constructor(public messageDescription: string, public value?: T) {
		super(messageDescription + (value !== undefined ? ': ' + value : ''));
	}
}
