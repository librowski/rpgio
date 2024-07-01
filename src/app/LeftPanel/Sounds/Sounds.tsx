import { PanelSection } from "../../../components/PanelSection/PanelSection";
import { Button } from "primereact/button";
import { useSoundStore } from "@/store/sounds";
import { ContextMenu } from "primereact/contextmenu";
import { Trash } from "@phosphor-icons/react";
import { useRef } from "react";

export function Sounds() {
	const { sounds, removeSound } = useSoundStore();
	const contextMenuRef = useRef<ContextMenu>(null);

	return (
		<PanelSection header="Sounds">
			{sounds.map((sound) => {
				const { name, id } = sound;

				return (
					<>
						<Button
							key={id}
							rounded
							onClick={onClick}
							onContextMenu={onContextMenu}
						>
							{name}
						</Button>
						<ContextMenu
							ref={contextMenuRef}
							key={`context-menu-${id}`}
							model={[
								{
									id: "delete",
									label: "Delete",
									icon: <Trash />,
									command: onDelete,
								},
							]}
						/>
					</>
				);
				function onContextMenu(event: React.MouseEvent) {
					contextMenuRef?.current?.show(event);
				}
				function onClick() {
					sound.play();
				}
				function onDelete() {
					removeSound(sound.id);
				}
			})}
		</PanelSection>
	);
}
