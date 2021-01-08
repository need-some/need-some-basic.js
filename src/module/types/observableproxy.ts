/**
 * Event that is fired from observable on change
 */
export interface ModelChangeEvent {
	/**
	 Source of the change, i.e. the model that fired the change. Note this is the observable proxy and not the wrapped object
	 */
	// tslint:disable-next-line: no-any // type of proxy not known
	source: any;

	/**
	 Original source of the change, the unwrapped object
	 */
	// tslint:disable-next-line: no-any // type of proxy not known
	obj: any;

	/**
		The changed member
	 */
	member: string;

	/**
		The value of the member after the change
	 */
	// tslint:disable-next-line: no-any // type of member not known
	value: any;

	/**
		The value of the member before change
	 */
	// tslint:disable-next-line: no-any // type of member not known
	oldvalue: any;
}

/**
 * Listener for model change events.
 * Note that the model change event is sent after the actual value change was applied, so the model already contains the current value.
 * TODO: Changing the model inside this handler will be performed <strong>after</strong> all handlers are processed in the same synchronous process.
 * <strong>Note</strong> changes to the model or the event handler list may lead to unexpected behaviour including endless looping
 */
export interface EventListener {
	/**
	 * Handle an object member change.
	 *
	 * @param event The event that denotes the change.
	 */
	handleEvent(event: ModelChangeEvent): void;
}

/**
 * function type to allow both EventListener instances and arrow functions.
 * @see EventListener for some additional information.
 */
export type EventListenerMethod = EventListener | ((event: ModelChangeEvent) => void);

/**
 * List of event listeners grouped by member.
 */
class EventListenerList {
	/**
	 * Map of listener methods
	 */
	private listeners: { [key: string]: EventListenerMethod[] } = {};

	/**
	 * Return initialized list
	 * @param member member that listeners are registered
	 * @returns initilized list for the member
	 */
	private getList(member: string) {
		if (!this.listeners[member]) {
			this.listeners[member] = [];
		}
		return this.listeners[member];
	}

	/**
	 * Send event to all registered listeners.
	 * @param member member that listeners are registered
	 * @param event the event containing source and value
	 */
	dispatchEvent(member: string, event: ModelChangeEvent) {
		const saveList = [...this.getList(member)];
		saveList.forEach(listener => {
			// tslint:disable-next-line: no-any // force any and then do type safe if-else
			const listenerAny: any = listener;
			if (listenerAny.handleEvent) {
				listenerAny.handleEvent(event);
			} else {
				listenerAny(event);
			}
		});
	}

	/**
	 * Unregister a listener. The listener will no longer be informed about model changes of the specified member.
	 * The instance is still be notified when is registered on other members.
	 * The instance to be unregistered is found on identity check. Unregistering while a listener inform loop is running may lead to notifications after this method call.
	 *
	 * @param member member that listeners are registered
	 * @param listener the listener object or method
	 */
	removeEventListener(member: string, listener: EventListenerMethod) {
		this.listeners[member] = this.getList(member).filter(l => l !== listener);
	}

	/**
	 * Register a listener. The listener wil informed about model changes of the specified member.
	 * The instance is can be registered on other members, but only once per member.
	 *
	 * @param member member that listeners are registered
	 * @param listener the listener object or method
	 */
	addEventListener(member: string, listener: EventListenerMethod) {
		let list = this.getList(member);
		if (!list.find(l => l === listener)) {
			list.push(listener);
		}
	}
}

/**
 * Proxy that allows observation on member base.
 */
export class ObservableProxy {
	static wrap<T>(object: T): T {
		// tslint:disable-next-line: no-any // force any and handle hidden member
		let anyObject: any = object;
		anyObject.logging = 'logging';
		if (!anyObject || anyObject.observableProxy) {
			return object;
		}
		let eventTarget = new EventListenerList();

		let functionListeners: { [key: string]: string[] } = {};

		for (let prop in anyObject) {
			if (typeof anyObject[prop] == 'function' && anyObject[prop].call) {
				functionListeners[prop] = [];
			}
		}

		// tslint:disable-next-line: no-any // proxy properties do not care about type
		const dispatch = (obj: any, member: string, memberName: string, value: any, oldvalue: any) => {
			let allowAnonymous = !functionListeners.hasOwnProperty(member);
			let event: ModelChangeEvent = { source: obj, obj: object, member: memberName, value: value, oldvalue: oldvalue };
			eventTarget.dispatchEvent(member, event);
			anyObject.logging += '\ndispatch ' + member + ' ' + value;
			anyObject.logging += '\ndispatch ' + JSON.stringify(eventTarget);
			for (let prop in functionListeners) {
				if (functionListeners.hasOwnProperty(prop)) {
					let fm = functionListeners[prop];
					if ((fm.length === 0 && allowAnonymous) || fm.indexOf(member) != -1) {
						anyObject.logging += '\nprop ' + prop + ' ' + allowAnonymous;
						let fvalue = anyObject[prop].call(anyObject);
						dispatch(obj, prop, prop, fvalue, undefined);
					}
				}
			}
		};

		// tslint:disable-next-line: no-any // proxy properties do not care about type
		const enabledFunction = (obj: any, member: string, state?: boolean) => {
			let isFunction = functionListeners.hasOwnProperty(member);
			let valueBefore = !(isFunction || anyObject['__disabled__' + member]);
			if (state === undefined) {
				// the getter
				return valueBefore;
			} else if (state !== valueBefore) {
				// the setter
				if (isFunction) {
					return false;
				}
				if (state) {
					delete anyObject['__disabled__' + member];
				} else {
					anyObject['__disabled__' + member] = true;
				}
				dispatch(obj, '__enabled__' + member, member + '[enabled]', state, valueBefore);
			} else {
				return true;
			}
		};

		let handler = {
			// tslint:disable-next-line: no-any // proxy properties do not care about type
			get: function(obj: any, member: string) {
				if (member == 'observableProxy') {
					return true;
				} else if (member == 'addEventListener') {
					return (m: string, listener: EventListener) => eventTarget.addEventListener(m, listener);
				} else if (member == 'removeEventListener') {
					return (m: string, listener: EventListener) => eventTarget.removeEventListener(m, listener);
				} else if (member == '__quietset') {
					// tslint:disable-next-line: no-any // proxy properties do not care about type
					return (m: string, value: any) => (obj[m] = value);
				} else if (member == '__enabled') {
					// tslint:disable-next-line: no-any // proxy properties do not care about type
					return (m: string, state?: boolean) => enabledFunction(obj, m, state);
				}
				return obj[member];
			},
			// tslint:disable-next-line: no-any // proxy properties do not care about type
			set: function(obj: any, member: string, value: any) {
				if (!enabledFunction(obj, member)) {
					// cannot set disabled member
					return false;
				}
				let oldvalue = obj[member];
				if (oldvalue === value) {
					return true;
				}
				obj[member] = value;
				dispatch(obj, member, member, value, oldvalue);
				return true;
			}
		};

		let proxy = new Proxy(anyObject, handler);
		return proxy;
	}

	// tslint:disable-next-line: no-any // allow listener on all objects - ignored if not proxy
	static addEventListener(object: any, member: string, listener: EventListenerMethod) {
		if (!object || !object.observableProxy) {
			return;
		}
		object.addEventListener(member, listener);
	}

	// tslint:disable-next-line: no-any // allow listener on all objects - ignored if not proxy
	static removeEventListener(object: any, member: string, listener: EventListenerMethod) {
		if (!object || !object.observableProxy) {
			return;
		}
		object.removeEventListener(member, listener);
	}

	// tslint:disable-next-line: no-any // allow listener on all objects - ignored if not proxy
	static addEnabledEventListener(object: any, member: string, listener: EventListenerMethod) {
		ObservableProxy.addEventListener(object, '__enabled__' + member, listener);
	}

	// tslint:disable-next-line: no-any // allow listener on all objects - ignored if not proxy
	static removeEnabledEventListener(object: any, member: string, listener: EventListenerMethod) {
		ObservableProxy.removeEventListener(object, '__enabled__' + member, listener);
	}

	// tslint:disable-next-line: no-any // allow listener on all objects - ignored if not proxy
	static setEnabled(object: any, member: string, state: boolean) {
		if (!object || !object.observableProxy) {
			return;
		}
		object.__enabled(member, state);
	}
	// tslint:disable-next-line: no-any // allow listener on all objects - ignored if not proxy
	static isEnabled(object: any, member: string) {
		if (!object || !object.observableProxy) {
			return;
		}
		return object.__enabled(member);
	}
}

export default ObservableProxy;
