import { useSoundForm } from "./useSoundForm";
import { FormProvider } from "react-hook-form";
import { useSoundStore } from "@/store/sounds";
import type { Sound } from "@/player/Sound";
import { useNavigateBack } from "@/hooks/useNavigateBack";
import { EntityView } from "@/components/EntityView/EntityView";
import { SoundForm } from "./SoundForm";
import { useParams } from "react-router";

export function EditSoundView() {
  const { id } = useParams();

  const methods = useSoundForm(id);
  const { getValues } = methods;

  const goBack = useNavigateBack();
  if (!id) {
    console.error("No id provided");
    goBack();
  }

  const { name } = getValues();
  const { updateSound } = useSoundStore();
  function onEditSound(sound: Sound) {
    if (!id) {
      return;
    }

    updateSound(id, sound);
    goBack();
  }

  return (
    <FormProvider {...methods}>
      <EntityView header={`${name} (editing)`}>
        <SoundForm onSave={onEditSound} confirmText="Add Sound" />
      </EntityView>
    </FormProvider>
  );
}
