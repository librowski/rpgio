import type { Icon } from "@phosphor-icons/react";
import { type HTMLMotionProps, motion } from "framer-motion";

import styles from "./IconButton.module.scss";

export function IconButton(props: Props) {
  const {
    icon: IconComponent,
    size,
    className,
    variant,
    ...rest
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <motion.div
      whileHover={{
        color: "var(--gray-50)",
      }}
      className={`${styles["icon-button"]} ${className}`}
      style={{ height: size, width: size }}
      {...rest}
    >
      <IconComponent size={size} weight={variant} />
    </motion.div>
  );
}

const DEFAULT_PROPS: Required<Pick<Props, "size" | "variant">> = {
  size: "1.5rem",
  variant: "regular",
};

type Props = HTMLMotionProps<"div"> & {
  icon: Icon;
  size?: string;
  variant?: "fill" | "regular";
};
