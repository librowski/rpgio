import { Text } from "../Text/Text";
import styles from "./PanelSection.module.scss";

export function PanelSection({ children, header }: Props) {
  return (
    <div className={styles["outer-container"]}>
      <Text color="primary" size="large">{header}</Text>
      <div className={styles["content-container"]}>
        {children}
      </div>
    </div>
  )
}

interface Props {
  children?: React.ReactNode;
  header: string;
}
