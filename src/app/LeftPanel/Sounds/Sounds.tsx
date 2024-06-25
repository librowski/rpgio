import { AudioFile } from "../../../player/AudioFile";
import { PanelSection } from "../../../components/PanelSection/PanelSection";
import { Button } from "primereact/button";

const path = "/home/jl/Downloads/104183__ekokubza123__punch.wav";

async function onOpen() {
  const sound = new AudioFile({ path });
  sound.play();
}

export function Sounds() {
  return (
    <PanelSection header="Sounds">
      <Button rounded onClick={onOpen}>
        Graj
      </Button>
    </PanelSection>
  );
}
