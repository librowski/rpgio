import type { Sound } from "@/player/Sound";
import { useSoundStore } from "@/store/sounds";
import { motion } from "framer-motion";
import { Dropdown } from "primereact/dropdown";
import type { SelectItem } from "primereact/selectitem";
import { useSceneFormContext } from "../useSceneForm";
import { useFieldArray } from "react-hook-form";
import { IconButton } from "@/components/IconButton/IconButton";
import { Plus, Trash } from "@phosphor-icons/react";
import { uuid } from "@/utils/uuid";
import type { SoundSchedulerOptions } from "@/player/SoundScheduler";
import { InputWrapper } from "@/components/inputs/InputWrapper/InputWrapper";
import { defaultSoundScheduleOptions } from "./defaultSoundSchedule";
import { IntervalOptions } from "./IntervalOptions";

export function SoundSchedules() {
  const { sounds } = useSoundStore();
  const typeOptions = [
    { label: "Interval", value: "interval" },
    { label: "Ambient", value: "ambient" },
  ];
  const options = sounds.map(soundToOption);

  const { control } = useSceneFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "soundSchedules",
  });

  return (
    <div className="flex flex-column gap-2">
      {fields.map((field, index) => {
        const {
          id,
          soundId,
          scheduleOptions: { type },
        } = field;

        function updateSchedule(
          index: number,
          patch: Partial<SoundSchedulerOptions>,
        ) {
          update(index, { ...field, ...patch });
        }

        return (
          <motion.div
            key={id}
            className="flex gap-2 justify-space-between align-items-end overflow-hidden"
          >
            <InputWrapper for="sound" name="Sound">
              <Dropdown
                id="sound"
                filter
                options={options}
                onChange={({ value }) => {
                  updateSchedule(index, { soundId: value });
                }}
                value={soundId}
              />
            </InputWrapper>
            <InputWrapper for="type" name="Type">
              <Dropdown
                id="type"
                filter
                options={typeOptions}
                onChange={({ value }) => {
                  updateSchedule(index, {
                    scheduleOptions: defaultSoundScheduleOptions(value),
                  });
                }}
                value={type}
              />
            </InputWrapper>
            {type === "interval" && (
              <IntervalOptions field={field} index={index} />
            )}
            <IconButton
              className="mb-1"
              icon={Trash}
              onClick={() => remove(index)}
            />
          </motion.div>
        );
      })}
      <IconButton
        icon={Plus}
        onClick={() =>
          append({
            id: uuid(),
            soundId: sounds[0].id,
            scheduleOptions: defaultSoundScheduleOptions(),
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
