import { WarningCircle } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import styles from "./WarningIcon.module.scss";
import { uuid } from "@/utils/uuid";
import { useRef } from "react";
import { Tooltip } from "primereact/tooltip";

export function WarningIcon({ warningMessage }: Props) {
	const id = useRef(uuid());
	const tooltipTarget = `warning-tooltip-target-${id.current}`;

	return (
		<motion.div className={styles["warning-icon"]}>
			<WarningCircle weight="bold" className={tooltipTarget} />
			<Tooltip
				content={warningMessage}
				target={`.${tooltipTarget}`}
				position="right"
			/>
		</motion.div>
	);
}

type Props = {
	warningMessage?: string;
};
