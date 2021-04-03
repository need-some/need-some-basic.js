import { ScalarConstructor } from '../types/constructor.type';

/**
 * Synchronous argument or argument provider.
 */
export type SyncArgument<T> = T | (() => T) | ScalarConstructor<T>;

export default SyncArgument;
