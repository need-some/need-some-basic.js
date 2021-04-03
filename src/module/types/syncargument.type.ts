
/**
 * Synchronous argument or argument provider.
 */
export type SyncArgument<T> = T | (() => T);

export default SyncArgument;
