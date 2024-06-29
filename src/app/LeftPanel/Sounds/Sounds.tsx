import { PanelSection } from "../../../components/PanelSection/PanelSection";
import { Button } from "primereact/button";
import { useSoundStore } from "@/store/sounds";

export function Sounds() {
  const { sounds } = useSoundStore();

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
