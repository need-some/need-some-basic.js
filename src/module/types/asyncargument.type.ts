/**
 * Constructor of a class.
 */
export type AsyncArgument<T> = T | (() => T) | (() => Promise<T>) | Promise<T>;

