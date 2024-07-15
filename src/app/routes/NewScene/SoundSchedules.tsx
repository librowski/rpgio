import type { Sound } from "@/player/Sound";
import { useSoundStore } from "@/store/sounds";
import { motion } from "framer-motion";
import { Dropdown } from "primereact/dropdown";
import type { SelectItem } from "primereact/selectitem";
import { useNewSceneFormContext } from "./useNewSceneForm";
import { Checkbox } from "primereact/checkbox";
import { InputNumber } from "primereact/inputnumber";
import { useFieldArray } from "react-hook-form";
import { IconButton } from "@/components/IconButton/IconButton";
import { Plus, Trash } from "@phosphor-icons/react";
import { uuid } from "@/utils/uuid";
import type { SoundSchedulerData } from "@/player/SoundScheduler";
import { WithLabel } from "@/components/Label/WithLabel";

export function SoundSchedules() {
  const { sounds } = useSoundStore();
  const options = sounds.map(soundToOption);

  const { control, setValue } = useNewSceneFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "soundSchedules",
  });

  return (
    <div>
      {fields.map((field, index) => {
        const {
          id,
          soundId,
          loop,
          interval: [from, to],
        } = field;

        function updateSchedule(
          index: number,
          patch: Partial<SoundSchedulerData>,
        ) {
          update(index, { ...field, ...patch });
        }

        return (
          <motion.div key={id} className="flex gap-2 justify-space-between">
            <WithLabel for="name" name="Name">
              <Dropdown
                id="name"
                filter
                options={options}
                onChange={({ value }) => {
                  updateSchedule(index, { soundId: value });
                }}
                value={soundId}
              />
            </WithLabel>
            <WithLabel for="from" name="From">
              <InputNumber
                id="from"
                suffix=" seconds"
                value={from}
                onChange={({ value }) =>
                  value && setValue(`soundSchedules.${index}.interval.0`, value)
                }
              />
            </WithLabel>
            <WithLabel for="to" name="To">
              <InputNumber
                suffix=" seconds"
                id="to"
                value={to}
                onChange={({ value }) =>
                  value && setValue(`soundSchedules.${index}.interval.1`, value)
                }
              />
            </WithLabel>
            <WithLabel for="loop" name="Loop">
              <Checkbox id="loop" checked={loop} />
            </WithLabel>
            <IconButton icon={Trash} onClick={() => remove(index)} />
          </motion.div>
        );
      })}
      <IconButton
        icon={Plus}
        onClick={() =>
          append({
            id: uuid(),
            soundId: sounds[0].id,
            loop: true,
            interval: [0, 0],
          })
        }
      />
    </div>
  );
}

function soundToOption(sound: Sound): SelectItem {
  return {
    label: sound.name,
    value: sound.id,
  };
}
