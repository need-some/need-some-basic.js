/**
 * Constructor of a class.
 */
export type ClassConstructor<T> = new () => T;

/**
 * Helper for a interface type construction
 */
// tslint:disable-next-line: no-empty-interface // force definition as an interface
export interface InterfaceConstructor<T> {
}

export type ScalarConstructor<T> = ClassConstructor<T> | InterfaceConstructor<T>;

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
 * Type guard for class constructor
 * @param type type to check
 */
export function isClass<T>(type: Constructor<T>): type is ClassConstructor<T> {
	// tslint:disable-next-line: no-any // type check performed
	return type && (type as any).type === undefined;
}

/**
 * Create array constructor for array
 * @param type scalar type to wrap
 */
export function asArray<T>(type: ScalarConstructor<T>): ArrayConstructor<T[], T> {
	return {
		type
	};
}

/**
 * Type guard for array constructor
 * @param type type to check
 */
// tslint:disable-next-line: no-any // second arg is unused in check
export function isArray<T>(type: Constructor<T>): type is ArrayConstructor<T, any> {
	// tslint:disable-next-line: no-any // type check performed
	return type && (type as ArrayConstructor<T, any>).type !== undefined;
}

/**
 * Create interface constructor for parameter
 * @param type scalar type to wrap
 */
export function asInterface<T>() {
	const result = <InterfaceConstructor<T>>{};
	// tslint:disable-next-line: no-any // only code to enforce a member
	(result as any).__faketype = 'initialized';
	return result;
}

/**
 * Type guard for interface constructor
 * @param type type to check
 */
export function isInterface<T>(type: Constructor<T>): type is InterfaceConstructor<T> {
	// tslint:disable-next-line: no-any // type check performed
	return type && (type as any).__faketype !== undefined;
}

/**
 * Type guard for interface constructor
 * @param type type to check
 */
export function isScalar<T>(type: Constructor<T>): type is ScalarConstructor<T> {
	return isInterface(type) || isClass(type);
}

/**
 * Create object of type
 * @param type type to wrap
 */
export function newInstance<T>(type: Constructor<T>): T {
	// tslint:disable-next-line: no-any // Array constructor safely wraps scalar type
	let result: any;
	if (isArray(type)) {
		result = [];
	} else if (isInterface(type)) {
		result = {};
	} else {
		result = new (<ClassConstructor<T>>type)();
	}
	return <T>result;
}


