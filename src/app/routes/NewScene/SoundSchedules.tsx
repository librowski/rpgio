import type { Sound } from "@/player/Sound";
import { useSoundStore } from "@/store/sounds";
import { motion } from "framer-motion";
import { Dropdown } from "primereact/dropdown";
import type { SelectItem } from "primereact/selectitem";
import { useNewSceneFormContext } from "./useNewSceneForm";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
import { useFieldArray } from "react-hook-form";
import { IconButton } from "@/components/IconButton/IconButton";
import { Plus, Trash } from "@phosphor-icons/react";
import { uuid } from "@/utils/uuid";
import type { SoundSchedulerData } from "@/player/SoundScheduler";

export function SoundSchedules() {
	const { sounds } = useSoundStore();
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
					interval: [from, to] = [],
					loop,
				} = field;

				function updateSchedule(
					index: number,
					patch: Partial<SoundSchedulerData>,
				) {
					update(index, { ...field, ...patch });
				}

				return (
					<motion.div key={id} className="flex gap-2 justify-space-between">
						<Dropdown
							filter
							options={options}
							onChange={({ value }) => {
								updateSchedule(index, { soundId: value });
							}}
							value={soundId}
						/>
						<InputNumber id="from" value={from ?? 0} />
						<InputNumber id="to" value={to ?? 0} />
						<Checkbox id="loop" checked={loop} />
						<IconButton icon={Trash} onClick={() => remove(index)} />
					</motion.div>
				);
			})}
			<IconButton
				icon={Plus}
				onClick={() =>
					append({ id: uuid(), soundId: sounds[0].id, loop: true })
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
