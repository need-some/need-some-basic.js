import { pit } from '@need-some/test';
import { Color, ColorConverter } from '../../module/types/color.type';

describe('Color', () => {
	const params = [
		{ title: 'undefined color', string: undefined, color: { red: 0, green: 0, blue: 0, alpha: 255, hex: '#000000', hexa: '#000000' } },
		{ title: 'empty color', string: '', color: { red: 0, green: 0, blue: 0, alpha: 255, hex: '#000000', hexa: '#000000' } },
		{ title: 'red color', string: '#FF0000', color: { red: 255, green: 0, blue: 0, alpha: 255, hex: '#ff0000', hexa: '#ff0000' } },
		{ title: 'green color', string: '#00Ff00', color: { red: 0, green: 255, blue: 0, alpha: 255, hex: '#00ff00', hexa: '#00ff00' } },
		{ title: 'blue color', string: '#0000fF', color: { red: 0, green: 0, blue: 255, alpha: 255, hex: '#0000ff', hexa: '#0000ff' } },
		{ title: 'black color', string: '#000000', color: { red: 0, green: 0, blue: 0, alpha: 255, hex: '#000000', hexa: '#000000' } },
		{
			title: 'black color with full alpha',
			string: '#000f',
			color: { red: 0, green: 0, blue: 0, alpha: 255, hex: '#000000', hexa: '#000000' }
		},
		{ title: 'white color', string: '#ffffff', color: { red: 255, green: 255, blue: 255, alpha: 255, hex: '#ffffff', hexa: '#ffffff' } },
		{
			title: 'white color with full alpha',
			string: '#ffffffff',
			color: { red: 255, green: 255, blue: 255, alpha: 255, hex: '#ffffff', hexa: '#ffffff' }
		},
		{ title: 'gray short color', string: '#ccc', color: { red: 204, green: 204, blue: 204, alpha: 255, hex: '#cccccc', hexa: '#cccccc' } },
		{ title: 'translucent cyan', string: '#0ff7', color: { red: 0, green: 255, blue: 255, alpha: 119, hex: '#00ffff', hexa: '#00ffff77' } },
		{
			title: 'translucent yellow',
			string: '#ffff0010',
			color: { red: 255, green: 255, blue: 0, alpha: 16, hex: '#ffff00', hexa: '#ffff0010' }
		},
		{
			title: 'translucent pink',
			string: '#ff007f@.5',
			color: { red: 255, green: 0, blue: 127, alpha: 128, hex: '#ff007f', hexa: '#ff007f80' }
		},
		{
			title: 'invisible brown',
			string: '#773300@0.',
			color: { red: 119, green: 51, blue: 0, alpha: 0, hex: '#773300', hexa: '#77330000' }
		},
		{
			title: 'opaque violet',
			string: '#7700AA@1.00',
			color: { red: 119, green: 0, blue: 170, alpha: 255, hex: '#7700aa', hexa: '#7700aa' }
		},
		{ title: 'unparseable', string: 'unparseable', color: undefined }
	];
	pit('should parse string ${title}', params.filter(p => p.color !== undefined), param => {
		const color = new Color(param.string);
		expect(color.red).toBe(param.color.red);
		expect(color.green).toBe(param.color.green);
		expect(color.blue).toBe(param.color.blue);
		expect(color.alpha).toBe(param.color.alpha);
	});
	pit('should throw error parsing string ${title}', params.filter(p => p.color === undefined), param => {
		expect(() => new Color(param.string)).toThrowError('cannot parse color string: ' + param.string);
	});
	pit('should unmarshal string ${title}', params.filter(p => p.color !== undefined), param => {
		const sut = new ColorConverter();
		const color = sut.unmarshal(param.string);
		expect(color.red).toBe(param.color.red);
		expect(color.green).toBe(param.color.green);
		expect(color.blue).toBe(param.color.blue);
		expect(color.alpha).toBe(param.color.alpha);
	});
	pit('should marshal string ${title}', params.filter(p => p.color !== undefined), param => {
		const sut = new ColorConverter();
		const color = sut.unmarshal(param.string);
		const result = sut.marshal(color);
		expect(result).toBe(param.color.hexa);
	});
	pit('should normalize string ${title}', params.filter(p => p.color !== undefined), param => {
		const color = new Color(param.string);
		expect(color.string).toBe(param.color.hexa);
	});
	pit('should transform rgb components ${title}', params.filter(p => p.color !== undefined), param => {
		const color = new Color(param.color.red, param.color.green, param.color.blue);
		expect(color.string).toBe(param.color.hex);
	});
	pit('should transform rgba components ${title}', params.filter(p => p.color !== undefined), param => {
		const color = new Color(param.color.red, param.color.green, param.color.blue, param.color.alpha);
		expect(color.string).toBe(param.color.hexa);
	});
});
