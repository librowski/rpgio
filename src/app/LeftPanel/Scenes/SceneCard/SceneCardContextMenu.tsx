import { useSceneStore } from "@/store/scenes";
import { Pencil, SpeakerX, Trash } from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";
import type { ContextMenuProps } from "primereact/contextmenu";
import { ContextMenu } from "primereact/contextmenu";
import type { MenuItem } from "primereact/menuitem";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();
	const scene = getById(sceneId);

	function onDelete() {
		removeScene(sceneId);
	}

	function onEdit() {
		navigate(`/scenes/edit/${sceneId}`);
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
