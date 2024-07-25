import { Sound } from "./Sound";
import type { SoundOptions } from "./Sound";
import { randomFloat } from "@/utils/random-float";

export class SoundScheduler {
  id: string;
  sound: Sound;
  scheduleOptions: ScheduleOptions;
  isEnabled = false;

  constructor({ soundOptions, scheduleOptions, id }: SoundSchedulerOptions) {
    this.sound = new Sound(soundOptions);
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

  toJson(): SoundSchedulerData {
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
  soundOptions: SoundOptions;
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

export type SoundSchedulerData = Omit<SoundSchedulerOptions, "soundOptions"> & {
  soundId: string;
};

type PlayOptions = {
  delay?: number;
};
