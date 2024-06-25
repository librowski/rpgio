import styles from "./LeftPanel.module.scss";
import { Scenes } from "./Scenes/Scenes";
import { Sounds } from "./Sounds/Sounds";

export function LeftPanel() {
	return (
		<div className={styles["left-panel"]}>
			<Scenes />
			<Sounds />
		</div>
	);
}
