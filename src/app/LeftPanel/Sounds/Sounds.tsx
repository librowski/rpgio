import { Button } from "primereact/button";
import { PanelSection } from "../../../components/PanelSection/PanelSection";
import { context } from "../../../player/globals";

async function onOpen() {
  const sound = await window.electronApi.openFile();
  const audioBuffer = await context.decodeAudioData(sound.buffer)
  const bufferNode = context.createBufferSource();
  bufferNode.buffer = audioBuffer;
  bufferNode.connect(context.destination);
  bufferNode.start();
}

export function Sounds() {
  return (
    <PanelSection header="Sounds">
      <Button rounded onClick={onOpen}>Graj</Button>
    </PanelSection>
  )
}
