import type { SoundSchedulerData } from "@/player/SoundScheduler";

export function defaultSoundScheduleOptions(): SoundSchedulerData["scheduleOptions"] {
	return {
		type: "interval",
		from: 0,
		to: 5,
	};
}
