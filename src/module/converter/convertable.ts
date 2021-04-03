import Converter from './converter';
import ConverterFactory from './converter.factory';
import SyncArgument from '../types/syncargument.type';
import SyncArgumentResolver from '../types/syncargumentresolver';

// tslint:disable-next-line: no-any // the annotation can define any param
export type anyParam = any;

interface ConverterFactoryFactory<T, S, C> {
	factory: ConverterFactory<T, S, C>;
	params?: SyncArgument<C>;
}

// tslint:disable-next-line: no-any // the annotation can use any converter
export type anyConverterFactory<T, S> = ConverterFactory<T, S, any>;
// tslint:disable-next-line: no-any // the annotation can use any converter
export type anyConverterFactoryFactory<T, S> = ConverterFactoryFactory<T, S, any>;


export type Convertable<T, S> = Converter<T, S> | anyConverterFactory<T, S> | anyConverterFactoryFactory<T, S>;

export namespace Convertable {
	export function createConverterInstance<T, S>(converter: SyncArgument<Convertable<T, S>>): Converter<T, S> {
		let converterInstance: Converter<T, S>;
		converter = new SyncArgumentResolver(converter).getValue();
		if ((<Converter<T, S>>converter).marshal !== undefined) {
			// a converter is detected if the marshal method exists
			converterInstance = <Converter<T, S>>converter;
		} else if ((<anyConverterFactory<T, S>>converter).createConverter !== undefined) {
			// a converterFactory is detected if the createConverter method exists
			converterInstance = (<anyConverterFactory<T, S>>converter).createConverter(undefined);
		} else if ((<anyConverterFactoryFactory<T, S>>converter).factory !== undefined) {
			// a converterFactory Factory is detected if the createConverter method exists
			const params = new SyncArgumentResolver((<anyConverterFactoryFactory<T, S>>converter).params).getValue();
			converterInstance = (<anyConverterFactoryFactory<T, S>>converter).factory.createConverter(params);
		} else {
			converterInstance = 'all converter types are checked' as never;
		}
		return converterInstance;
	}

}

export default Convertable;
