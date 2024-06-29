import { PanelSection } from "../../../components/PanelSection/PanelSection";
import { Button } from "primereact/button";
import { useSoundsStore } from "@/store/sounds";

export function Sounds() {
	const { sounds } = useSoundsStore();

	return (
		<PanelSection header="Sounds">
			{sounds.map((sound) => {
				return (
					<Button key={sound.name} rounded onClick={onClick}>
						{sound.name}
					</Button>
				);

				function onClick() {
					sound.play();
				}
			})}
		</PanelSection>
	);
}
