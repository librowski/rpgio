import type { Icon } from "@phosphor-icons/react";
import { Tag as PrimeReactTag } from "primereact/tag";
import styles from "./Tag.module.scss";

export function Tag({ value, icon: Icon }: Props) {
	return (
		<PrimeReactTag
			className={styles.tag}
			severity="info"
			icon={() => <Icon />}
			value={value}
		/>
	);
}

type Props = {
	value: string;
	icon: Icon;
};
