import { padLeft, adjust } from '../stdmethods';
import { Converter } from '../converter/converter';
import { ConversionError } from '../converter/conversion.error';

/**
 * The pattern of a hexadecimal color #rrggbb
 * @link https://www.w3.org/TR/css-color-4/#hex-notation
 */
const PATTERN_HEX = /^#[0-9a-f]{6}$/;

/**
 * The shortened pattern of a hexadecimal color #rgb where all channel chars are duplicated
 * @link https://www.w3.org/TR/css-color-4/#hex-notation
 */
const PATTERN_HEX_SHORT = /^#[0-9a-f]{3}$/;

/**
 * The pattern of a hexadecimal color #rrggbbaa where the last component is the alpha channel.
 * @link https://www.w3.org/TR/css-color-4/#hex-notation
 */
const PATTERN_HEX_ALPHAHEX = /^#[0-9a-f]{8}$/;

/**
 * The shortened pattern of a hexadecimal color #rgba where the last component is the alpha channel and all channel chars are duplicated.
 * @link https://www.w3.org/TR/css-color-4/#hex-notation
 */
const PATTERN_HEX_ALPHAHEX_SHORT = /^#[0-9a-f]{4}$/;

/**
 * A pattern of a hexadecimal color #rgb@a where the alpha component is given as a opacity from 0.0 to 1.0 after the @ char
 */
const PATTERN_HEX_ALPHA_AT = /^#[0-9a-f]{6}@((0?\.\d+)|(0\.?)|(1(\.0*)?))$/;

/**
 * The maximum of a channel
 */
const MAX_VALUE = 255;

/**
 * The base value of heaxdecimal numbers
 */
const HEX = 16;

/**
 * Format a number in 2-digit hex, padded with 0
 * @param n the number to format
 */
function padHex(n?: number): string {
	return padLeft((<number>n).toString(HEX), '0', 2);
}

/**
 * Type representing a RGB color
 */
export class Color {
	/**
	 * The red color component
	 */
	private _red?: number;

	/**
	 * The green color component
	 */
	private _green?: number;

	/**
	 * The blue color component
	 */
	private _blue?: number;

	/**
	 * The alpha component
	 */
	private _alpha?: number;

	/**
	 * A canonical string representation.
	 */
	private _string?: string;

	/**
	 * Instantiate a new object. The color represents an opaque black.
	 */
	constructor();

	/**
	 * Instantiate a new color. The color is parsed from the input string.
	 * Accepted formats are
	 * <ul>
	 * <li>The pattern of a hexadecimal color <code>#rrggbb</code></li>
	 * <li>The shortened pattern of a hexadecimal color <code>#rgb</code> where all channel chars are duplicated</li>
	 * <li>The pattern of a hexadecimal color <code>#rrggbbaa</code> where the last component is the alpha channel.</li>
	 * <li>The shortened pattern of a hexadecimal color <code>#rgba</code> where the last component is the alpha
	 *     channel and all channel chars are duplicated.</li>
	 * <li>A pattern of a hexadecimal color <code>#rgb@a</code> where the alpha component is given as a opacity
	 *     from 0.0 to 1.0 after the @ char</li>
	 * </ul>
	 * @param string the color string in a known format
	 */
	constructor(string: string);

	/**
	 * Instantiate a color with the given channels. Numbers exceeding the range are capped at the lower or upper bound.
	 * @param red red channel with range 0-255
	 * @param green green channel with range 0-255
	 * @param blue blue channel with range 0-255
	 * @param alpha optional alpha channel with range 0-255. If omitted, fully opaque 255 is used.
	 */
	constructor(red: number, green: number, blue: number, alpha?: number);

	/**
	 * Internal combined constructor.
	 */
	constructor(redOrString?: number | string, green?: number, blue?: number, alpha?: number) {
		if (redOrString === undefined || redOrString === '') {
			return;
		} else if (green === undefined) {
			const string = (<string>redOrString).toLowerCase();
			if (PATTERN_HEX.test(string)) {
				this._string = string;
			} else if (PATTERN_HEX_SHORT.test(string)) {
				const r = string.substr(1, 1);
				const g = string.substr(2, 1);
				const b = string.substr(3, 1);
				this._string = '#' + r + r + g + g + b + b;
			} else if (PATTERN_HEX_ALPHAHEX.test(string)) {
				const rgb = string.substr(1, 6);
				let a = string.substr(7, 2);
				if (a === 'ff') {
					a = '';
				}
				this._string = '#' + rgb + a;
			} else if (PATTERN_HEX_ALPHAHEX_SHORT.test(string)) {
				const r = string.substr(1, 1);
				const g = string.substr(2, 1);
				const b = string.substr(3, 1);
				let a = string.substr(4, 1);
				if (a === 'f') {
					a = '';
				}
				this._string = '#' + r + r + g + g + b + b + a + a;
			} else if (PATTERN_HEX_ALPHA_AT.test(string)) {
				const rgb = string.substr(1, 6);
				let a = padHex(Math.round(parseFloat(string.split('@')[1]) * MAX_VALUE));
				if (a === 'ff') {
					a = '';
				}
				this._string = '#' + rgb + a;
			} else {
				throw new ConversionError('cannot parse color string', string);
			}
		} else {
			this._red = adjust(<number>redOrString, 0, MAX_VALUE);
			this._green = adjust(<number>green, 0, MAX_VALUE);
			this._blue = adjust(<number>blue, 0, MAX_VALUE);
			this._alpha = alpha === undefined ? MAX_VALUE : adjust(<number>alpha, 0, MAX_VALUE);
		}
	}

	/**
	 * Initialize the missing information. I.e. parse values from string or build up normalized string.
	 */
	private init() {
		if (this._alpha === undefined) {
			if (this._string === undefined) {
				this._red = 0;
				this._green = 0;
				this._blue = 0;
				this._alpha = MAX_VALUE;
				this._string = '#000000';
			} else if (PATTERN_HEX_ALPHAHEX.test(this._string)) {
				this._red = parseInt(this._string.substr(1, 2), HEX);
				this._green = parseInt(this._string.substr(3, 2), HEX);
				this._blue = parseInt(this._string.substr(5, 2), HEX);
				this._alpha = parseInt(this._string.substr(7, 2), HEX);
			} else {
				this._red = parseInt(this._string.substr(1, 2), HEX);
				this._green = parseInt(this._string.substr(3, 2), HEX);
				this._blue = parseInt(this._string.substr(5, 2), HEX);
				this._alpha = MAX_VALUE;
			}
		} else if (this._string === undefined) {
			this._string =
				'#' + padHex(this._red) + padHex(this._green) + padHex(this._blue) + (this._alpha < MAX_VALUE ? '' + padHex(this._alpha) : '');
		}
	}

	/**
	 * The red component
	 */
	get red(): number {
		this.init();
		return <number>this._red;
	}

	/**
	 * The green component
	 */
	get green(): number {
		this.init();
		return <number>this._green;
	}

	/**
	 * The blue component
	 */
	get blue(): number {
		this.init();
		return <number>this._blue;
	}

	/**
	 * The alpha component
	 */
	get alpha(): number {
		this.init();
		return <number>this._alpha;
	}

	/**
	 * A canonical string representation.
	 */
	get string(): string {
		this.init();
		return <string>this._string;
	}
}

/**
 * Converter between color and nex string.
 */
export class ColorConverter implements Converter<Color, string> {
	unmarshal(serialized: string): Color {
		return new Color(serialized);
	}
	marshal(object: Color): string {
		return object.string;
	}
}
