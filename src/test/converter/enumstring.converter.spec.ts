import { EnumStringConverter } from '../../module/converter/enumstring.converter';

export enum ValueEnum {
	ABC = 'ABC',
	DEF = 'DEF'
}

export enum NamedEnum {
	GHI,
	JKL
}

export enum NumberEnum {
	MNO = 1,
	PQR = 2
}

describe('EnumStringConverter', () => {
	it('should marshal value enum', () => {
		const sut = new EnumStringConverter(ValueEnum);
		const result = sut.marshal(ValueEnum.DEF);
		expect(result).toEqual('DEF');
	});
	it('should marshal number enum', () => {
		const sut = new EnumStringConverter(NumberEnum);
		const result = sut.marshal(NumberEnum.PQR);
		expect(result).toEqual('PQR');
	});
	it('should marshal named enum', () => {
		const sut = new EnumStringConverter(NamedEnum);
		const result = sut.marshal(NamedEnum.JKL);
		expect(result).toEqual('JKL');
	});
	it('should unmarshal value enum', () => {
		const sut = new EnumStringConverter(ValueEnum);
		const result = sut.unmarshal('DEF');
		expect(result).toEqual(ValueEnum.DEF);
	});
	it('should unmarshal number enum', () => {
		const sut = new EnumStringConverter(NumberEnum);
		const result = sut.unmarshal('PQR');
		expect(result).toEqual(NumberEnum.PQR);
	});
	it('should unmarshal named enum', () => {
		const sut = new EnumStringConverter(NamedEnum);
		const result = sut.unmarshal('JKL');
		expect(result).toEqual(NamedEnum.JKL);
	});
});
