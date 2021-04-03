import SyncArgument from './syncargument.type';

export class SyncArgumentResolver<T> {
	private _syncValue: T | undefined;
	private _functionValue: (() => T) | undefined;

	constructor(arg?: SyncArgument<T>) {
		// tslint:disable-next-line: no-any // overcome too strict behaviour. type safety is done with the if else construct.
		let x: any = arg;
		if (typeof x == 'function') {
			this._functionValue = x;
		} else {
			this._syncValue = x;
		}
	}

	getValue(): T {
		if (this._functionValue !== undefined) {
			let result = this._functionValue.call(null);
			return result;
		} else {
			// tslint:disable-next-line: no-any // If for some reasons no function and no argument is passed, undefined seems to be the intention
			let x: any = this._syncValue;
			return x;
		}
	}
}

export default SyncArgumentResolver;

