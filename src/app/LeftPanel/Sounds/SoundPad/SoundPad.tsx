import { Button } from "primereact/button";
import { SoundPadContextMenu } from "./SoundPadContextMenu";
import { useSoundStore } from "@/store/sounds";
import { useRef } from "react";
import type { ContextMenu } from "primereact/contextmenu";

export function SoundPad({ soundId }: Props) {
	const { getById } = useSoundStore();
	const sound = getById(soundId);
	const contextMenuRef = useRef<ContextMenu>(null);

	if (!sound) {
		console.error("Sound not found");
		return null;
	}

	const { name } = sound;

	function onClick() {
		sound?.play();
	}

	function onContextMenu(event: React.MouseEvent) {
		contextMenuRef?.current?.show(event);
	}

	return (
		<>
			<Button
				key={soundId}
				rounded
				onClick={onClick}
				onContextMenu={onContextMenu}
			>
				{name}
			</Button>
			<SoundPadContextMenu soundId={soundId} ref={contextMenuRef} />
		</>
	);
}

type Props = {
	soundId: string;
};
