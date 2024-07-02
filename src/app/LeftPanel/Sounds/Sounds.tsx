import { PanelSection } from "../../../components/PanelSection/PanelSection";
import { useSoundStore } from "@/store/sounds";
import { SoundPad } from "./SoundPad/SoundPad";

export function Sounds() {
  const { sounds } = useSoundStore();

  return (
    <PanelSection header="Sounds">
      {sounds.map(({ id }) => {
        return <SoundPad key={id} soundId={id} />;
      })}
    </PanelSection>
  );
}
