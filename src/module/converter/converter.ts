import { Unmarshaller } from './unmarshaller';
import { Marshaller } from './marshaller';

/**
 * Converter from serialized (json) variant to object and back.
 * @param T The object type to create
 * @param S The serialized version. May denote an interface for structured json
 */
export interface Converter<T, S> extends Unmarshaller<T, S>, Marshaller<T, S> {}

export default Converter;
