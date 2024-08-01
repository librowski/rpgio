import { useSoundForm } from "./useSoundForm";
import { FormProvider } from "react-hook-form";
import { useSoundStore } from "@/store/sounds";
import type { Sound } from "@/player/Sound";
import { EntityView } from "@/components/EntityView/EntityView";
import { SoundForm } from "./SoundForm";

export function NewSoundView() {
  const methods = useSoundForm();
  const { addSound } = useSoundStore();

  function onAddSound(sound: Sound) {
    addSound(sound);
  }

  return (
    <FormProvider {...methods}>
      <EntityView header="New Sound">
        <SoundForm onSave={onAddSound} confirmText="Add Sound" />
      </EntityView>
    </FormProvider>
  );
}
