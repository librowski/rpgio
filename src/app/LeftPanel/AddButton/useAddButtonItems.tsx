import { ROUTES } from "@/app/routes/routes";
import { Lightning, Image, Waveform } from "@phosphor-icons/react";
import type { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";

export function useAddButtonItems() {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      label: "Add actions",
      icon: () => <Lightning size={20} />,
      command: () => { },
    },
    {
      label: "Add sounds",
      icon: () => <Waveform size={20} />,
      command: () => navigate(ROUTES.NEW_SOUND),
    },
    {
      label: "Add scenes",
      icon: () => <Image size={20} />,
      command: () => { },
    },
  ];

  return menuItems;
}
