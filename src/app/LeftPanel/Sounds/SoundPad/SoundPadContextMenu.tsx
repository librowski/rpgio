import { useSoundStore } from "@/store/sounds";
import { Trash, SpeakerX } from "@phosphor-icons/react";
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

function useContextMenuItems(soundId: string): MenuItem[] {
  const { removeSound, getById } = useSoundStore();
  const sound = getById(soundId);

  const onDelete = () => {
    removeSound(soundId);
  };

  const onMute = () => {
    sound?.mute();
  };

  return [
    {
      label: "Mute",
      icon: <SpeakerX />,
      command: onMute,
    },
    {
      label: "Delete",
      icon: <Trash />,
      command: onDelete,
    },
  ];
}

type Props = ContextMenuProps & {
  soundId: string;
};
