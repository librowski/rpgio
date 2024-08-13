import { InputWrapper } from "@/components/inputs/InputWrapper/InputWrapper";
import { InputNumber } from "primereact/inputnumber";
import { type SceneFormData, useSceneFormContext } from "../useSceneForm";

export function IntervalOptions({ field, index }: Props) {
  const { scheduleOptions } = field;
  if (scheduleOptions.type !== "interval") {
    console.warn("Invalid schedule type");
    return null;
  }

  const { from, to } = scheduleOptions;
  const { setValue } = useSceneFormContext();

  return (
    <>
      <InputWrapper for="from" name="From">
        <InputNumber
          id="from"
          suffix=" seconds"
          value={from}
          onChange={({ value }) =>
            value &&
            setValue(`soundSchedules.${index}.scheduleOptions.from`, value)
          }
        />
      </InputWrapper>
      <InputWrapper for="to" name="To">
        <InputNumber
          suffix=" seconds"
          id="to"
          value={to}
          onChange={({ value }) =>
            value &&
            setValue(`soundSchedules.${index}.scheduleOptions.to`, value)
          }
        />
      </InputWrapper>
    </>
  );
}

type Props = {
  field: SceneFormData["soundSchedules"][number];
  index: number;
};
