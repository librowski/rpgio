import { useSoundStore } from "@/store/sounds";
import { Trash, SpeakerX, Pencil, type IconProps } from "@phosphor-icons/react";
import type { ContextMenuProps } from "primereact/contextmenu";
import { ContextMenu } from "primereact/contextmenu";
import type { MenuItem } from "primereact/menuitem";
import { forwardRef } from "react";

export const SoundPadContextMenu = forwardRef<ContextMenu, Props>(
  function SoundPadContextMenu({ soundId, ...props }, ref) {
    const menuItems = useContextMenuItems(soundId);

    return (
      <ContextMenu
        ref={ref}
        key={`context-menu-${soundId}`}
        model={menuItems}
        {...props}
      />
    );
  },
);

type Props = ContextMenuProps & {
  soundId: string;
};

function useContextMenuItems(soundId: string): MenuItem[] {
  const { removeSound, getById } = useSoundStore();
  const sound = getById(soundId);

  function onDelete() {
    removeSound(soundId);
  }

  function onEdit() {
    console.log("Edit sound");
  }

  function onMute() {
    sound?.mute();
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
