import { Toolbar } from "primereact/toolbar";
import styles from "./Topbar.module.scss";
import { Text } from "../../components/Text/Text";
import { CornersOut, X, Gear } from "@phosphor-icons/react";
import { IconButton } from "../../components/IconButton/IconButton";

export function Topbar() {
  return (
    <Toolbar start={Start} end={End} className={styles.topbar} />
  );
}

function Start() {
  return (
    <div className="flex gap-2">
      <Text weight="light" color="accent">Rpgio</Text>
      <Text weight="light">v2.137</Text>
    </div>
  );
}

function End() {
  return (
    <div className="flex">
      <IconButton icon={Gear} />
      <IconButton icon={CornersOut} />
      <IconButton icon={X} />
    </div>
  );
}
