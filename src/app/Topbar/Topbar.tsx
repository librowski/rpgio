import { CornersOut, Gear, X } from "@phosphor-icons/react";

import { IconButton } from "../../components/IconButton/IconButton";
import { Text } from "../../components/Text/Text";

import styles from "./Topbar.module.scss";

import { Toolbar } from "primereact/toolbar";

export function Topbar() {
	return <Toolbar className={styles.topbar} end={End} start={Start} />;
}

function Start() {
	return (
		<div className="flex gap-2">
			<Text color="accent" weight="light">
				Rpgio
			</Text>
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
