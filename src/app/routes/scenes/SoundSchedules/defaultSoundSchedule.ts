import type { SoundSchedulerOptions } from "@/player/SoundScheduler";

export function defaultSoundScheduleOptions(
	type: SoundSchedulerOptions["scheduleOptions"]["type"] = "interval",
): SoundSchedulerOptions["scheduleOptions"] {
	return type === "interval"
		? {
				type: "interval",
				from: 0,
				to: 5,
			}
		: {
				type: "ambient",
			};
}
