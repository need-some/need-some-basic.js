/**
 * Constructor of a class.
 */
export type ScalarConstructor<T> = new () => T;

/**
 * Helper for a array type construction
 */
export interface ArrayConstructor<T, S> {
	/**
	 * The type of items in the array.
	 */
	type: ScalarConstructor<S>;
}

/**
 * Scalar or array constructor
 */
// tslint:disable-next-line: no-any // Array constructor safely wraps scalar type
export type Constructor<T> = ScalarConstructor<T> | ArrayConstructor<T, any>;

/**
 * Create array constructor for array
 * @param type scalar type to wrap
 */
export function asArray<T>(type: ScalarConstructor<T>): ArrayConstructor<T[], T> {
	return {
		type: type
	};
}

/**
 * Type guard for array constructor
 * @param type type to check
 */
// tslint:disable-next-line: no-any // second arg is unused in check
export function isArray(type: any): type is ArrayConstructor<any, any> {
	return type.type !== undefined;
}

/**
 * Create object of type
 * @param type type to wrap
 */
export function create<T>(type: Constructor<T>): T {
	// tslint:disable-next-line: no-any // Array constructor safely wraps scalar type
	let result: any;
	// tslint:disable-next-line: no-any // Array constructor safely wraps scalar type
	if (isArray(type)) {
		result = [];
	} else {
		result = new (<ScalarConstructor<T>>type)();
	}
	return <T>result;
}

