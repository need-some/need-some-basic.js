import { ObservableProxy, EventListener, ModelChangeEvent } from '../../module/types/observableproxy';

class Simple {
	test: string | undefined;
}
class Initialized {
	test: string;
	test2: string;
	testadded() {
		return this.test + ' really';
	}

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
		let called = 0;
		let listener = event => {
			called++;
		};
		ObservableProxy.addEventListener(observable, 'test', listener);
		ObservableProxy.removeEventListener(observable, 'test', listener);
		observable.test = 'works good';

		expect(called).toBe(0);
	});
	it('should call change of method', () => {
		let model: any = new Initialized();
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
		ObservableProxy.addEventListener(observable, 'testadded', listener);
		observable.test = 'works good';

		expect(called).toBe(1);
		expect(before).toBeUndefined();
		expect(after).toBe('works good really');
		expect(change).toBe('testadded');
	});
	it('property should be enabled', () => {
		let model: any = new Initialized();
		let observable = ObservableProxy.wrap(model);

		expect(ObservableProxy.isEnabled(observable, 'test')).toBeTruthy();
	});
	it('property can be forced disabled', () => {
		let model: any = new Initialized();
		let observable = ObservableProxy.wrap(model);
		ObservableProxy.setEnabled(observable, 'test', false);
		expect(ObservableProxy.isEnabled(observable, 'test')).toBeFalsy();

		let called = 0;
		let listener = event => {
			called++;
		};
		ObservableProxy.addEventListener(observable, 'test', listener);
		try {
			observable.test = 'works good';
		} catch (e) {}
		expect(called).toBe(0);
		expect(observable.test).toBe('works');
	});
	it('function should be disabled', () => {
		let model: any = new Initialized();
		let observable = ObservableProxy.wrap(model);

		expect(ObservableProxy.isEnabled(observable, 'testadded')).toBeFalsy();
	});
	it('should call change of enabled', () => {
		let model: any = new Initialized();
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
		ObservableProxy.addEnabledEventListener(observable, 'test', listener);
		ObservableProxy.setEnabled(observable, 'test', false);

		//expect(observable.logging).toBe("");
		expect(called).toBe(1);
		expect(before).toBeTruthy();
		expect(after).toBeFalsy();
		expect(change).toBe('test[enabled]');
	});
});
