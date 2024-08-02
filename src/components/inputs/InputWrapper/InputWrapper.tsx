import clsx from "clsx";
import { Text } from "../../Text/Text";
import styles from "./InputWrapper.module.scss";
import { WarningIcon } from "../../WarningIcon/WarningIcon";

export function InputWrapper({
  children,
  for: htmlFor,
  name,
  warningMessage,
  className,
  ...rest
}: Props) {
  return (
    <div
      className={clsx(
        "flex flex-1 flex-column gap-1",
        styles["with-label"],
        className,
      )}
      {...rest}
    >
      <div className="flex align-items-center gap-1">
        <Text<"label"> tag="label" htmlFor={htmlFor} size="small">
          {name}
        </Text>
        {warningMessage && <WarningIcon warningMessage={warningMessage} />}
      </div>
      {children}
    </div>
  );
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
  for: string;
  name: string;
  children: React.ReactNode;
  warningMessage?: string;
};
