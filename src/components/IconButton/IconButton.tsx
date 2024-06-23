import { Button, ButtonProps } from "primereact/button";
import type { Icon, IconProps } from "@phosphor-icons/react";

export function IconButton(props: Props) {
  const { icon: IconComponent, iconProps, ...rest } = { ...DEFAULT_BUTTON_PROPS, ...props };
  const finalIconProps = { ...DEFAULT_ICON_PROPS, ...iconProps };

  return <Button icon={() => <IconComponent {...finalIconProps} />} {...rest} />
}

interface Props extends Omit<ButtonProps, "icon"> {
  icon: Icon;
  iconProps?: IconProps;
}

const DEFAULT_BUTTON_PROPS: ButtonProps = {
  rounded: true,
  text: true,
}

const DEFAULT_ICON_PROPS: IconProps = {
  size: 20,
}

