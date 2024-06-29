import { Text } from "../Text/Text";

import styles from "./PanelSection.module.scss";

export function PanelSection({ children, header }: Props) {
  return (
    <div className={styles["outer-container"]}>
      <Text color="primary" size="large" weight="semi-bold">
        {header}
      </Text>
      <div className={styles["content-container"]}>{children}</div>
    </div>
  );
}

type Props = {
  children?: React.ReactNode;
  header: string;
};
