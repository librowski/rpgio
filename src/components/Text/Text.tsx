import type { HTMLAttributes, ReactNode } from "react";
import { createElement } from "react";
import styles from "./Text.module.scss";

import { clsx } from "clsx";

export function Text(props: Partial<TextProps>) {
  const { tag, weight, size, children, color, ...rest } = { ...defaultTextCSSProps, ...props };

  return createElement(
    tag,
    {
      className: clsx(styles[`weight-${weight}`], styles[`size-${size}`], styles[`color-${color}`], styles.text),
      ...rest,
    },
    children,
  );
}

type TextProps = {
  size: "small" | "medium" | "large";
  weight: "light" | "regular" | "bold";
  color: "accent" | "primary" | "secondary";
  tag: "p" | "span" | "h1" | "h2" | "h3" | "h4";
  className: string;
  children?: ReactNode | undefined;
} & HTMLAttributes<HTMLParagraphElement>;

type TextCSSProps = Omit<TextProps, "className">;

const defaultTextCSSProps: TextCSSProps = {
  tag: "span",
  size: "medium",
  weight: "regular",
  color: "secondary"
};
