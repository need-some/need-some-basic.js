import { Constructor, ArrayConstructor, ClassConstructor, InterfaceConstructor, create, asArray, asInterface } from '../../module/types/constructor.type';

class Simple {
	test: string | undefined;
}
class Initialized {
	test: string;
	constructor() {
		this.test = 'works';
	}
}
interface Inter {
	myfield: string;
}

describe('Constructor', () => {
	it('should wrap scalar constructor', () => {
		let sut = Simple;
		expect((<ArrayConstructor<Simple, any>>(<Constructor<Simple>>sut)).type).toBeUndefined();
		expect((<any>(<Constructor<Simple>>sut)).__faketype).toBeUndefined();
	});
	it('should create scalar object', () => {
		let sut = Simple;
		expect(create(sut).test).toBeUndefined();
	});
	it('should create scalar object with defined constructor', () => {
		let sut = Initialized;
		expect(create(sut).test).toBe('works');
	});
	it('should wrap array constructor', () => {
		let sut = asArray(Simple);
		expect((<any>sut.type).name).toBe('Simple');
	});
	it('should create array object', () => {
		let sut = asArray(Simple);
		expect(create(sut).length).toBe(0);
	});
	it('should create interface object', () => {
		let sut = asInterface<Inter>();
		expect(create(sut) as any).toEqual({});
	});

});
