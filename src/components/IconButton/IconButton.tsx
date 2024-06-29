import type { Icon, IconProps } from "@phosphor-icons/react";

import type { ButtonProps } from "primereact/button";
import { Button } from "primereact/button";

export function IconButton(props: Props) {
  const {
    icon: IconComponent,
    iconProps,
    ...rest
  } = { ...DEFAULT_BUTTON_PROPS, ...props };
  const finalIconProps = { ...DEFAULT_ICON_PROPS, ...iconProps };

  return (
    <Button icon={() => <IconComponent {...finalIconProps} />} {...rest} />
  );
}

type Props = {
  icon: Icon;
  iconProps?: IconProps;
} & Omit<ButtonProps, "icon">;

const DEFAULT_BUTTON_PROPS: ButtonProps = {
  rounded: true,
  text: true,
};

const DEFAULT_ICON_PROPS: IconProps = {
  size: 20,
};
