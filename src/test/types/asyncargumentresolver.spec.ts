import { AsyncArgument } from '../../module/types/asyncargument.type';
import { AsyncArgumentResolver } from '../../module/types/asyncargumentresolver';

class TestWithArg {
	public testValue = 0;

	async setAsync(a: AsyncArgument<number>) {
		this.testValue = await new AsyncArgumentResolver(a).getValue();
	}
}

describe('AsyncArgumentResolver', () => {
	it('should execute sync undefined', async () => {
		let sut = new AsyncArgumentResolver<string>(undefined);
		expect(await sut.getValue()).toBeUndefined();
	});
	it('should execute sync plain', async () => {
		let sut = new AsyncArgumentResolver<string>('hallo sync');
		expect(await sut.getValue()).toBe('hallo sync');
	});
	it('should execute plain promise', async () => {
		let sut = new AsyncArgumentResolver<string>(
			new Promise<string>((resolve, reject) => {
				resolve('hello promise');
			})
		);
		expect(await sut.getValue()).toBe('hello promise');
	});
	it('should execute plain async function', async () => {
		let sut = new AsyncArgumentResolver<string>(async () => 'hello async');
		expect(await sut.getValue()).toBe('hello async');
	});
	it('should execute plain sync function', async () => {
		let sut = new AsyncArgumentResolver<string>(() => 'hello sync');
		expect(await sut.getValue()).toBe('hello sync');
	});
	it('should execute plain async with contained promise', async () => {
		let sut = new AsyncArgumentResolver<string>(
			async () =>
				new Promise<string>((resolve, reject) => {
					resolve('hello async promise');
				})
		);
		expect(await sut.getValue()).toBe('hello async promise');
	});
	it('should resolve as member', async () => {
		let sut = new TestWithArg();
		await sut.setAsync(12);
		expect(sut.testValue).toBe(12);
	});
	it('should resolve member async', async () => {
		let sut = new TestWithArg();
		let arg = async () => 23;

		await sut.setAsync(arg);
		expect(sut.testValue).toBe(23);
	});
});
