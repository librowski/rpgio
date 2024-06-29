import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import { createElement } from "react";

import styles from "./Text.module.scss";

import { clsx } from "clsx";

export function Text<T extends TextTag = "span">(props: Partial<TextProps<T>>) {
	const { tag, weight, size, children, color, className, ...rest } = {
		...defaultTextCSSProps,
		...props,
	};

	return createElement(
		tag,
		{
			className: clsx(
				styles[`weight-${weight}`],
				styles[`size-${size}`],
				styles[`color-${color}`],
				styles.text,
				className,
			),
			...rest,
		},
		children,
	);
}

type TextProps<T extends TextTag> = {
	size: "small" | "medium" | "large" | "extra-large";
	weight: "semi-bold" | "thin" | "extra-light" | "regular" | "bold";
	color: "accent" | "primary" | "secondary";
	tag: T;
	className?: string;
	children?: ReactNode | undefined;
} & (T extends "label"
	? LabelHTMLAttributes<HTMLLabelElement>
	: HTMLAttributes<T>);

type TextTag = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "label";

const defaultTextCSSProps: TextProps<"span"> = {
	color: "secondary",
	size: "medium",
	tag: "span",
	weight: "regular",
};
