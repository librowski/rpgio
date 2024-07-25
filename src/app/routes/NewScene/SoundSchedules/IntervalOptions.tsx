import { WithLabel } from "@/components/Label/WithLabel";
import { InputNumber } from "primereact/inputnumber";
import {
	type NewSceneFormData,
	useNewSceneFormContext,
} from "../useNewSceneForm";

export function IntervalOptions({ field, index }: Props) {
	const { scheduleOptions } = field;
	if (scheduleOptions.type !== "interval") {
		console.warn("Invalid schedule type");
		return null;
	}

	const { from, to } = scheduleOptions;
	const { setValue } = useNewSceneFormContext();

	return (
		<>
			<WithLabel for="from" name="From">
				<InputNumber
					id="from"
					suffix=" seconds"
					value={from}
					onChange={({ value }) =>
						value && setValue(`soundSchedules.${index}.scheduleOptions.from`, value)
					}
				/>
			</WithLabel>
			<WithLabel for="to" name="To">
				<InputNumber
					suffix=" seconds"
					id="to"
					value={to}
					onChange={({ value }) =>
						value && setValue(`soundSchedules.${index}.scheduleOptions.to`, value)
					}
				/>
			</WithLabel>
		</>
	);
}

type Props = {
	field: NewSceneFormData["soundSchedules"][number];
	index: number;
};
