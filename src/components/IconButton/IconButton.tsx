import type { Icon } from "@phosphor-icons/react";
import { type HTMLMotionProps, motion } from "framer-motion";

import styles from "./IconButton.module.scss";

export function IconButton(props: Props) {
  const {
    icon: IconComponent,
    size,
    className,
    ...rest
  } = { ...DEFAULT_PROPS, ...props };

  return (
    <motion.div
      whileHover={{
        color: "var(--gray-50)",
        background: "rgba(255 255 255 / 0.1)",
      }}
      className={`${styles["icon-button"]} ${className}`}
      {...rest}
    >
      <IconComponent size={size} />
    </motion.div>
  );
}

const DEFAULT_PROPS: Pick<Props, "size"> = {
  size: "1rem",
};

type Props = HTMLMotionProps<"div"> & {
  icon: Icon;
  size?: string;
};
