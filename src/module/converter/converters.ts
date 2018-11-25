import { Unmarshaller } from './unmarshaller';
import { Marshaller } from './marshaller';
import { Converter } from './converter';
import { ArrayConverter } from './array.converter';
import { NullSafeStringConverter } from './nullsafestring.converter';
import { NullSafeConverter } from './nullsafe.converter';
import { UndefinedSafeConverter } from './undefinedsafe.converter';
import { IdentityConverter } from './identity.converter';

/**
 * Factory for common converters.
 */

/**
 * Create an instance to marshal with the given function
 * @param fun The marshal function
 * @returns marshal instance
 */
export function marshal<T, S>(fun: (object: T) => S): Marshaller<T, S> {
	return {
		marshal: o => fun(o)
	};
}

/**
 * Create an instance to unmarshal with the given function
 * @param fun The unmarshal function
 * @returns unmarshal instance
 */
export function unmarshal<T, S>(fun: (serialized: S) => T): Unmarshaller<T, S> {
	return {
		unmarshal: s => fun(s)
	};
}

/**
 * Create an instance to marshal with the given function
 * @param marshalFunction marshal function
 * @param unmarshalFunction unmarshal function
 * @returns converter instance
 */
export function convert<T, S>(marshalFunction: (object: T) => S, unmarshalFunction: (serialized: S) => T): Converter<T, S> {
	return {
		marshal: o => marshalFunction(o),
		unmarshal: s => unmarshalFunction(s)
	};
}

/**
 * Construct a new converter instance that simple returns the given instance
 */
export function identity<S>(): Converter<S, S> {
	return new IdentityConverter();
}

/**
 * Construct a new converter instance that swaps marshalling and unmarshalling
 */
export function swap<T, S>(converter: Converter<S, T>): Converter<T, S> {
	return {
		marshal(object: T) {
			return converter.unmarshal(object);
		},
		unmarshal(serialized: S) {
			return converter.marshal(serialized);
		}
	};
}

/**
 * Construct a new converter instance.
 * @param converter The converter to call for each array item.
 */
export function map<T, S>(converter: Converter<T, S>): Converter<T[], S[]> {
	return new ArrayConverter(converter);
}

/**
 * Construct a new string converter instance which allows null. If null is unmarshalled, an empty string is returned.
 * @param converter The converter to call after null check
 */
export function nullsafestring<T>(converter: Converter<T, string>): Converter<T | undefined | null, string> {
	if (converter instanceof NullSafeStringConverter) {
		return converter;
	}
	return new NullSafeStringConverter(converter);
}

/**
 * Construct a new converter instance which allows null.
 * @param converter The converter to call after null check
 */
export function nullsafe<T, S>(converter: Converter<T, S>): Converter<T | null, S | null> {
	if (converter instanceof NullSafeConverter) {
		return converter;
	}
	return new NullSafeConverter(converter);
}

/**
 * Construct a new converter instance which allows undefined.
 * @param converter The converter to call after undefined check
 */
export function undefinedsafe<T, S>(converter: Converter<T, S>): Converter<T | undefined, S | undefined> {
	if (converter instanceof UndefinedSafeConverter) {
		return converter;
	}
	return new UndefinedSafeConverter(converter);
}
