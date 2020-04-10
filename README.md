# need-some-basic.js
[![Build Status](https://travis-ci.org/need-some/need-some-basic.js.svg?branch=master)](https://travis-ci.org/need-some/need-some-basic.js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/%40need-some%2Fbasic.svg)](https://badge.fury.io/js/%40need-some%2Fbasic)
[![need-some/basic](https://img.shields.io/badge/need--some-basic-ff69b4.svg)](https://www.npmjs.com/org/need-some)
[![Dependencies](https://david-dm.org/need-some/need-some-basic.js/status.svg)](https://david-dm.org/need-some/need-some-basic.js)

_need-some_ is a collection of small yet useful functions.
The basic package provides core functionality that can be used in many javascript and typescript applications.

## Installation
Simply install as dependency

	npm install @need-some/basic --save

## stdmethods
Methods for compatibility, but not defined as polyfill

### adjust
Adjust number, so it fits into the given borders. If the given number is lower than the lower bound (or greater than the upper bound), the bound is returned.
If a bound is undefined, this side is not adjusted. If the lower bound is greater than the upper bound, the result is kind of unexpected, and always one of the bounds.

	adjust (n: number, lower: number|undefined, upper: number|undefined): number

### trunc
Truncate fractional part of number. Returns the signed integer part

	trunc (n: number): number

### padLeft
Pad a string to have at least n characters. The c characters are appended in front (left) of the string

	padLeft (s: string, c: string, n: number): string

### padRight
Pad a string to have at least n characters. The c characters are appended at the end (right) of the string

	padRight (s: string, c: string, n: number): string

### padNumber
Pad a number with leading zeros to have at least n characters.
If the number is negative, the numbers absolute value is padded to one character less and a leading minus sign is added.
If the number string is already longer than the given length, it is returned without change.

	padNumber (s: number, n: number): string

### startsWith
Check whether a string starts with another string.

	startsWith (str: string, start: string): boolean

### endsWith
Check whether a string ends with another string

	endsWith (str: string, start: string): boolean

### splitSimple
Split string on delimiter. A delimiter can be delimited by backslash '\'

	splitSimple (s: string, delim: string): string[]

### splitBrackets
Split well-formed string into parts with brakets.
Within the enclosed strings, the brakets will not be considered.
 * E.g. `'a+(b+(c+d))+(e+f)'` will be split into `'a+'`, `'b+(c+d))'`, `'+'`, `'(e+f)'`

The resulting array will always start with an unenclosed part and have one unenclosed part between the enclosed ones.
These parts may be empty strings to provide a strict structure
 * E.g. `'(b+(c+d))'` will be split into `''`, `'b+(c+d))'`
 * and `'(b+(c+d))(e+f)'` will be split into `''`, `'b+(c+d))'`, `''`, `'e+f'`

Alternative start delimiters can be used to mask end delimiter within the enclosed parts
 * E.g. `'a${b:{c}}'` with start `'${'` and end `'}'` needs alternative start `'{'` so the outmost closing bracket is found


	splitBracket(s: string, dstart: string, dend: string, altdstarts?: string[]): string[]

### lookup
Return the nested child of an object.

	lookup(object: any, key: (string | number) | ((string | number)[])): any

### overwrite
Set the value of a nested child of an object.

	overwrite(object: any, key: (string | number) | ((string | number)[]), value: any): void

## Converters

Interfaces for converters of string (or similar serialized form) to an object and vice versa are defined here.

The main interfaces are 
Marshaller to serialize objects with its method `marshal(object: T): S` and Unmarshaller to deserialize with `unmarshal(serialized: S): T`
`S` is the type of the serialization (e.g. string) and `T` is the deserialized object type.

There are some convenience methods to use converters

### marshal
Create an instance to marshal with the given function

	marshal<T, S>(fun: (object: T) => S): Marshaller<T, S>

### unmarshal
Create an instance to unmarshal with the given function

	unmarshal<T, S>(fun: (serialized: S) => T): Unmarshaller<T, S>

### convert
Create an instance to marshal with the given function

	convert<T, S>(marshalFunction: (object: T) => S, unmarshalFunction: (serialized: S) => T): Converter<T, S>

### identity
Construct a new converter instance that simple returns the given instance

	identity<S>(): Converter<S, S> {

### map
Construct a new converter instance that calls the given converter for each array item.

	map<T, S>(converter: Converter<T, S>): Converter<T[], S[]>

### nullsafestring
Construct a new string converter instance which allows null. If null is unmarshalled, an empty string is returned.

	nullsafestring<T>(converter: Converter<T, string>): Converter<T | undefined | null, string>

### nullsafe
Construct a new converter instance which allows null.

	nullsafe<T, S>(converter: Converter<T, S>): Converter<T | null, S | null>

### undefinedsafe
Construct a new converter instance which allows undefined.

	undefinedsafe<T, S>(converter: Converter<T, S>): Converter<T | undefined, S | undefined>

## Types

### Color
Color is a class that parses and holds the color values.

### ColorConverter
Convenience converter to convert between a color object and a hex string.
