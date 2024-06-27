import type { MenuItem } from "primereact/menuitem";
import { SpeedDial } from "primereact/speeddial";
import { Lightning, Image, Waveform } from "@phosphor-icons/react";
import styles from "./AddButton.module.scss";
import { Tooltip } from "primereact/tooltip";

const menuItems: MenuItem[] = [
  {
    label: "Add actions",
    icon: () => <Lightning />,
    command: () => { },
    disabled: true,
  },
  {
    label: "Add sounds",
    icon: () => <Waveform />,
    command: () => { },
    disabled: false,
  },
  {
    label: "Add scenes",
    icon: () => <Image />,
    command: () => { },
    disabled: true,
  },
];

export function AddButton() {
  const addButtonClassName = styles["add-button"];
  const tooltipTarget = `.${addButtonClassName} .p-speeddial-action`;

  return (
    <div className={styles["add-button-container"]}>
      <Tooltip
        className={styles.tooltip}
        target={tooltipTarget}
        position="top"
      />
      <SpeedDial
        className={addButtonClassName}
        model={menuItems}
        type="semi-circle"
        direction="up"
        radius={80}
      />
    </div>
  );
}
