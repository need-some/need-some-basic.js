import { ConversionError } from '../../module/converter/conversion.error';

export const dummyConverter = {
	unmarshal(string: string): string {
		if (string === 'throw') {
			throw new ConversionError('illegal string', string);
		}
		return 'unmarshal ' + string;
	},
	marshal(string: string): string {
		return 'marshal ' + string;
	}
};
export const dummyConverter2 = {
	unmarshal(string: string): string {
		return 'unmarshal 2 ' + string;
	},
	marshal(string: string): string {
		return 'marshal 2 ' + string;
	}
};
