export type BooleanValue = {
	kind: "boolean";
	value: boolean | number;
};

/** RGBA */
export type Color = [number, number, number, number];
export type ColorValue = {
	kind: "Color";
	value: Color;
};

// can we borrow from types in Fiasco?
export const NumberType = [
	"number",
	"bigint",
	"u8",
	"u16",
	"u32",
	"u64",
	"i8",
	"i16",
	"i32",
	"i64",
	"f32",
	"f64",
] as const;

export type NumberValue = {
	kind: (typeof NumberType)[number];
	value: number;
};

export type StringValue = {
	kind: "string" | "Text";
	value: string;
};

export type Vec2 = { x: number; y: number };
export type VecValue = {
	kind: "Vec2";
	value: Vec2;
};

export type ValueType =
	| StringValue
	| NumberValue
	| VecValue
	| ColorValue
	| BooleanValue;

type ClickableEntry = {
	onClick: (path: string) => void;
};

type ValueEntry = ValueType & {
	readonly?: boolean;
	onChange?: (value: any, path: string) => void;
};

type CollapsibleList = {
	list: CollapsibleEntry[];
};

type DisplayText = {
	label: string;
};

/**
 * Information necessary to render a collapsible list element.
 * Can be display text, button, or input.
 * All:
 * - label: (required) display text
 *
 * Button:
 * - onClick: (required) on click callback
 *
 * Input:
 * - type: (required) what type of value
 * - readonly: (optional) defaults to false
 * - value: (required) value to populate the input
 * - onChange: (required) callback when the input value is updated
 */
export type CollapsibleEntry =
	| DisplayText
	| (DisplayText & (ClickableEntry | ValueEntry | CollapsibleList));
