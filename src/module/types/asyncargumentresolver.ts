import { AsyncArgument } from './asyncargument.type';

export class AsyncArgumentResolver<T> {
	private _syncValue: T | undefined;
	private _asyncValue: Promise<T> | undefined;
	private _functionValue: (() => T) | undefined;

	constructor(arg?: AsyncArgument<T>) {
		// tslint:disable-next-line: no-any // overcome too strict behaviour. type safety is done with the if else construct.
		let x: any = arg;
		if (x && x.then) {
			this._asyncValue = x;
		} else if (typeof x == 'function') {
			this._functionValue = x;
		} else {
			this._syncValue = x;
		}
	}

	async getValue(): Promise<T> {
		if (this._syncValue !== undefined) {
			return new Promise<T>((resolve, reject) => {
				resolve(this._syncValue);
			});
		} else if (this._asyncValue !== undefined) {
			return this._asyncValue;
		} else if (this._functionValue !== undefined) {
			let result = this._functionValue.call(null);
			return new Promise<T>((resolve, reject) => {
				resolve(result);
			});
		} else {
			return new Promise<T>((resolve, reject) => {
				resolve(undefined);
			});
		}
	}
}

export default AsyncArgument;
