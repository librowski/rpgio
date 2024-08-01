import { IconButton } from "@/components/IconButton/IconButton";
import { Text } from "@/components/Text/Text";
import { ArrowLeft } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import styles from "./EntityView.module.scss";
import { useNavigateBack } from "@/hooks/useNavigateBack";

export function EntityView({ children, header }: Props) {
  const goBack = useNavigateBack();

  return (
    <motion.div
      animate
      className={`flex gap-2 flex-column ${styles.container}`}
    >
      <div className="m-1 flex align-items-center gap-2 relative">
        <IconButton
          icon={ArrowLeft}
          className={styles["back-button"]}
          onClick={goBack}
        />
        <Text size="extra-large" weight="bold">
          {header}
        </Text>
      </div>
      {children}
    </motion.div>
  );
}

type Props = {
  children: React.ReactNode;
  header: string;
};
