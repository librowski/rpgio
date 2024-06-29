import { Text } from "@/components/Text/Text";
import { MultiSelect } from "primereact/multiselect";
import { useState } from "react";

export function SceneSelect() {
	const [scenes, setScenes] = useState<string[]>([]);

	return (
		<div className="flex flex-1 flex-column gap-1 overflow-hidden">
			<Text<"label"> tag="label" htmlFor="scenes">
				Scenes
			</Text>
			<MultiSelect
				id="scenes"
				options={["Dark Forest", "Market Square", "Deep Cave"]}
				onChange={({ value }) => setScenes(value)}
				value={scenes}
			/>
		</div>
	);
}
