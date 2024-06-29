import { SpeedDial } from "primereact/speeddial";
import styles from "./AddButton.module.scss";
import { Tooltip } from "primereact/tooltip";
import { useAddButtonItems } from "./useAddButtonItems";

export function AddButton() {
  const addButtonClassName = styles["add-button"];
  const tooltipTarget = `.${addButtonClassName} .p-speeddial-action`;

  const menuItems = useAddButtonItems();

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
