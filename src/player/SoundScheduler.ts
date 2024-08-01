import { useSoundStore } from "@/store/sounds";
import type { Sound } from "./Sound";
import { randomFloat } from "@/utils/random-float";

export class SoundScheduler {
  id: string;
  sound: Sound;
  scheduleOptions: ScheduleOptions;
  isEnabled = false;

  constructor({ soundId, scheduleOptions, id }: SoundSchedulerOptions) {
    const sound = useSoundStore.getState().getById(soundId);
    if (!sound) {
      throw new Error(`Could not find sound with id ${soundId}`);
    }

    this.sound = sound;
    this.scheduleOptions = scheduleOptions;
    this.id = id;
  }

  play({ delay }: PlayOptions = {}) {
    const timeout = delay ?? 0;

    setTimeout(() => {
      if (!this.isEnabled) {
        return;
      }

      this.sound.play();
    }, timeout);
  }

  playWithRandomDelay() {
    const timeout = this.getInterval();
    console.log("Playing with timeout", timeout);

    this.play({ delay: timeout });
  }

  start() {
    this.isEnabled = true;
    this.playWithRandomDelay();
    this.sound.eventEmitter.subscribe("end", this.onEnd);
  }

  stop() {
    this.isEnabled = false;
    this.sound.eventEmitter.unsubscribe("end", this.onEnd);
    this.sound.mute();
  }

  toJson(): SoundSchedulerOptions {
    return {
      id: this.id,
      soundId: this.sound.id,
      scheduleOptions: this.scheduleOptions,
    };
  }

  onEnd = () => {
    this.sound.eventEmitter.unsubscribe("end", this.onEnd);
    this.playWithRandomDelay();
  };

  private getInterval() {
    const SECOND = 1000;
    const { type } = this.scheduleOptions;

    if (type === "ambient") {
      return 0;
    }

    if (type === "interval") {
      const { from, to } = this.scheduleOptions;
      return randomFloat(from, to) * SECOND;
    }
  }
}

export type SoundSchedulerOptions = {
  id: string;
  soundId: string;
  scheduleOptions: ScheduleOptions;
};

type ScheduleOptions = IntervalOptions | AmbientOptions;

type IntervalOptions = {
  type: "interval";
  from: number;
  to: number;
};

type AmbientOptions = {
  type: "ambient";
};

type PlayOptions = {
  delay?: number;
};
