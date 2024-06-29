import { Text } from "@/components/Text/Text";
import { MultiSelect } from "primereact/multiselect";
import { Controller } from "react-hook-form";
import { useNewSoundFormContext } from "./useNewSoundForm";

export function SceneSelect() {
	const { control, setValue } = useNewSoundFormContext();

	return (
		<Controller
			name="sceneIds"
			control={control}
			render={({ field }) => (
				<div className="flex flex-1 flex-column gap-1 overflow-hidden">
					<Text<"label"> tag="label" htmlFor="scenes">
						Scenes
					</Text>
					<MultiSelect
						id="scenes"
						options={["Dark Forest", "Market Square", "Deep Cave"]}
						{...field}
						onChange={({ value }) => {
							setValue("sceneIds", value);
						}}
						value={field.value}
					/>
				</div>
			)}
		/>
	);
}
