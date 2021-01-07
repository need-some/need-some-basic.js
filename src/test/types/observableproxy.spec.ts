import { ObservableProxy, EventListener, ModelChangeEvent } from '../../module/types/observableproxy';

class Simple {
	test: string | undefined;
}
class Initialized {
	test: string;
	test2: string;
	constructor() {
		this.test = 'works';
	}
}

describe('ObservableProxy', () => {
	it('should wrap object member', () => {
		let observable = ObservableProxy.wrap(new Initialized());
		let before = '';
		let after = '';
		let change = '';
		let called = 0;
		let listener = {
			handleEvent: function(event) {
				called++;
				change = event.member;
				after = event.value;
				before = event.oldvalue;
			}
		};
		ObservableProxy.addEventListener(observable, 'test', listener);
		observable.test = 'works good';

		expect(called).toBe(1);
		expect(before).toBe('works');
		expect(after).toBe('works good');
		expect(change).toBe('test');
	});
	it('should call function', () => {
		let model = new Initialized();
		let observable = ObservableProxy.wrap(model);
		let before = '';
		let after = '';
		let change = '';
		let called = 0;
		let listener = event => {
			called++;
			change = event.member;
			after = event.value;
			before = event.oldvalue;
		};
		ObservableProxy.addEventListener(observable, 'test', listener);
		observable.test = 'works good';

		expect(called).toBe(1);
		expect(before).toBe('works');
		expect(after).toBe('works good');
		expect(change).toBe('test');
	});
	it('should call function and handler', () => {
		let model = new Initialized();
		let observable = ObservableProxy.wrap(model);
		let before = '';
		let after = '';
		let change = '';
		let called = 0;
		let listener = event => {
			called++;
			change = event.member;
			after = event.value;
			before = event.oldvalue;
		};
		ObservableProxy.addEventListener(observable, 'test', listener);
		let listener2 = {
			handleEvent: function(event) {
				called++;
				change = event.member;
				after = event.value;
				before = event.oldvalue;
			}
		};
		ObservableProxy.addEventListener(observable, 'test', listener2);
		observable.test = 'works good';

		expect(called).toBe(2);
		expect(before).toBe('works');
		expect(after).toBe('works good');
		expect(change).toBe('test');
	});
	it('should not call same function twice', () => {
		let model = new Initialized();
		let observable = ObservableProxy.wrap(model);
		let before = '';
		let after = '';
		let change = '';
		let called = 0;
		let listener = event => {
			called++;
			change = event.member;
			after = event.value;
			before = event.oldvalue;
		};
		ObservableProxy.addEventListener(observable, 'test', listener);
		ObservableProxy.addEventListener(observable, 'test', listener);
		observable.test = 'works good';

		expect(called).toBe(1);
		expect(before).toBe('works');
		expect(after).toBe('works good');
		expect(change).toBe('test');
	});
	it('should not call same function after delete', () => {
		let model = new Initialized();
		let observable = ObservableProxy.wrap(model);
		let before = '';
		let after = '';
		let change = '';
		let called = 0;
		let listener = event => {
			called++;
			change = event.member;
			after = event.value;
			before = event.oldvalue;
		};
		ObservableProxy.addEventListener(observable, 'test', listener);
		ObservableProxy.removeEventListener(observable, 'test', listener);
		observable.test = 'works good';

		expect(called).toBe(0);
	});
});
