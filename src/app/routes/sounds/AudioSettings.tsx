import { Slider } from "@/components/inputs/Slider/Slider";
import { useSoundFormContext } from "./useSoundForm";
import type { SliderChangeEvent } from "primereact/slider";
import { Text } from "@/components/Text/Text";
import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown";
import { IMPULSE_RESPONSES } from "@/player/impulseResponses";
import { InputWrapper } from "@/components/inputs/InputWrapper/InputWrapper";

export function AudioSettings() {
	const { setValue, watch } = useSoundFormContext();

	function onChangeVolume({ value }: SliderChangeEvent) {
		setValue("volume", value as number);
	}

	function onChangePlaybackRate({ value }: SliderChangeEvent) {
		setValue("playbackRate", value as number);
	}

	function onChangeReverbLevel({ value }: SliderChangeEvent) {
		setValue("reverbLevel", value as number);
	}

	function onChangeReverbType({ value }: DropdownChangeEvent) {
		setValue("reverbType", value as string);
	}

	const reverbOptions = IMPULSE_RESPONSES.map(({ name, url }) => ({
		label: name,
		value: url,
	}));

	return (
		<div className="flex flex-column flex-1 gap-2 mt-2 mx-2">
			<Text size="medium" weight="bold">
				Audio Settings
			</Text>

			<div className="flex gap-2">
				<div className="flex flex-column flex-1 gap-2">
					<Slider
						onChange={onChangeVolume}
						value={watch("volume")}
						for="volume"
						name="Volume"
						valueSuffix="%"
					/>
					<Slider
						onChange={onChangePlaybackRate}
						value={watch("playbackRate")}
						for="playbackRate"
						name="Playback rate"
						valueSuffix="%"
						min={10}
						max={300}
					/>
				</div>
				<div className="flex flex-column flex-1 gap-2">
					<InputWrapper for="reverbType" name="Reverb type">
						<Dropdown
							options={reverbOptions}
							value={watch("reverbType")}
							onChange={onChangeReverbType}
						/>
					</InputWrapper>
					<Slider
						onChange={onChangeReverbLevel}
						value={watch("reverbLevel")}
						for="reverbLevel"
						name="Reverb level"
						valueSuffix="%"
						min={0}
						max={100}
					/>
				</div>
			</div>
		</div>
	);
}
