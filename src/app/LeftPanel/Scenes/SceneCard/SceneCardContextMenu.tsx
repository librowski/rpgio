import { useSceneStore } from "@/store/scenes";
import { log } from "@/utils/log";
import { Trash, SpeakerX, Pencil, type IconProps } from "@phosphor-icons/react";
import type { ContextMenuProps } from "primereact/contextmenu";
import { ContextMenu } from "primereact/contextmenu";
import type { MenuItem } from "primereact/menuitem";
import { forwardRef } from "react";

export const SceneCardContextMenu = forwardRef<ContextMenu, Props>(
	function SceneCardContextMenu({ sceneId, ...props }, ref) {
		const menuItems = useContextMenuItems(sceneId);

		return (
			<ContextMenu
				ref={ref}
				key={`context-menu-${sceneId}`}
				model={menuItems}
				{...props}
			/>
		);
	},
);

type Props = ContextMenuProps & {
	sceneId: string;
};

function useContextMenuItems(sceneId: string): MenuItem[] {
	const { removeScene, getById, deactiveateScene } = useSceneStore();
	const scene = getById(sceneId);

	function onDelete() {
		removeScene(sceneId);
	}

	function onEdit() {
		log({ message: "Edit scene" });
	}

	function onMute() {
		scene?.stop();
		deactiveateScene();
	}

	const iconProps: IconProps = {
		size: 20,
	};

	return [
		{
			label: "Mute",
			icon: <SpeakerX {...iconProps} />,
			command: onMute,
		},
		{
			label: "Edit",
			icon: <Pencil {...iconProps} />,
			command: onEdit,
		},
		{
			label: "Delete",
			icon: <Trash {...iconProps} />,
			command: onDelete,
			className: "p-danger",
		},
	];
}
