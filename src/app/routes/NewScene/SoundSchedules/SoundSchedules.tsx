import type { Sound } from "@/player/Sound";
import { useSoundStore } from "@/store/sounds";
import { motion } from "framer-motion";
import { Dropdown } from "primereact/dropdown";
import type { SelectItem } from "primereact/selectitem";
import { useNewSceneFormContext } from "../useNewSceneForm";
import { useFieldArray } from "react-hook-form";
import { IconButton } from "@/components/IconButton/IconButton";
import { Plus, Trash } from "@phosphor-icons/react";
import { uuid } from "@/utils/uuid";
import type { SoundSchedulerData } from "@/player/SoundScheduler";
import { WithLabel } from "@/components/Label/WithLabel";
import { defaultSoundScheduleOptions } from "./defaultSoundSchedule";
import { IntervalOptions } from "./IntervalOptions";

export function SoundSchedules() {
	const { sounds } = useSoundStore();
  const typeOptions = [
    { label: "Interval", value: "interval" },
    { label: "Random", value: "random" },
  ];
	const options = sounds.map(soundToOption);

	const { control } = useNewSceneFormContext();
	const { fields, append, remove, update } = useFieldArray({
		control,
		name: "soundSchedules",
	});

	return (
		<div>
			{fields.map((field, index) => {
				const {
					id,
					soundId,
          scheduleOptions: { type }
				} = field;

				function updateSchedule(
					index: number,
					patch: Partial<SoundSchedulerData>,
				) {
					update(index, { ...field, ...patch });
				}

				return (
					<motion.div key={id} className="flex gap-2 justify-space-between">
						<WithLabel for="sound" name="Sound">
							<Dropdown
								id="sound"
								filter
								options={options}
								onChange={({ value }) => {
									updateSchedule(index, { soundId: value });
								}}
								value={soundId}
							/>
						</WithLabel>
						<WithLabel for="type" name="Type">
							<Dropdown
								id="type"
								filter
								options={typeOptions}
								onChange={({ value }) => {
									updateSchedule(index, { soundId: value });
								}}
								value={type}
							/>
						</WithLabel>
            { type === "interval" && <IntervalOptions field={field} index={index} /> }
						<IconButton icon={Trash} onClick={() => remove(index)} />
					</motion.div>
				);
			})}
			<IconButton
				icon={Plus}
				onClick={() =>
					append({
						id: uuid(),
						soundId: sounds[0].id,
            scheduleOptions: defaultSoundScheduleOptions()
					})
				}
			/>
		</div>
	);
}

function soundToOption(sound: Sound): SelectItem {
	return {
		label: sound.name,
		value: sound.id,
	};
}
