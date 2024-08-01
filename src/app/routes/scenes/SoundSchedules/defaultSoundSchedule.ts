import type { SoundSchedulerData } from "@/player/SoundScheduler";

export function defaultSoundScheduleOptions(
	type: SoundSchedulerData["scheduleOptions"]["type"] = "interval",
): SoundSchedulerData["scheduleOptions"] {
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
