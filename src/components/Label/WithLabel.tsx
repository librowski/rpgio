import { Text } from "../Text/Text";

export function WithLabel({ children, for: htmlFor, name }: Props) {

  return (
    <div className="flex flex-column gap-1">
      <Text<"label"> tag="label" htmlFor={htmlFor} size="small">
        { name }
      </Text>
      { children }
    </div>
  );
}

interface Props {
  for: string;
  name: string;
  children: React.ReactNode;
}
