import type { Sound } from "@/player/Sound";
import { useSoundStore } from "@/store/sounds";
import { motion } from "framer-motion";
import { Dropdown } from "primereact/dropdown";
import type { SelectItem } from "primereact/selectitem";

export function SoundSchedule() {
	const { sounds } = useSoundStore();
	const options = sounds.map(soundToOption);

	return (
		<motion.div className="flex gap-2 justify-space-between">
			<Dropdown filter options={options} />
		</motion.div>
	);
}

function soundToOption(sound: Sound): SelectItem {
	return {
		label: sound.name,
		value: sound.id,
	};
}
