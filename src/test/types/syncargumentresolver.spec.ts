import { SyncArgument } from '../../module/types/syncargument.type';
import { SyncArgumentResolver } from '../../module/types/syncargumentresolver';

class TestWithArg {
	public testValue = 0;

	setSync(a: SyncArgument<number>) {
		this.testValue = new SyncArgumentResolver(a).getValue();
	}
}

describe('SyncArgumentResolver', () => {
	it('should execute sync undefined', () => {
		let sut = new SyncArgumentResolver<string>(undefined);
		expect(sut.getValue()).toBeUndefined();
	});
	it('should execute sync plain', () => {
		let sut = new SyncArgumentResolver<string>('hallo sync');
		expect(sut.getValue()).toBe('hallo sync');
	});
	it('should execute plain sync function', () => {
		let sut = new SyncArgumentResolver<string>(() => 'hello sync');
		expect(sut.getValue()).toBe('hello sync');
	});
	it('should resolve as member', () => {
		let sut = new TestWithArg();
		sut.setSync(12);
		expect(sut.testValue).toBe(12);
	});
	it('should resolve member sync', () => {
		let sut = new TestWithArg();
		let arg = () => 23;

		sut.setSync(arg);
		expect(sut.testValue).toBe(23);
	});
});
