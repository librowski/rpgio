import { useCountdown } from "usehooks-ts";

export function useAudioCountdown(duration: number) {
  const [time, { startCountdown, resetCountdown }] = useCountdown({
    countStart: Math.round(duration),
    countStop: 0,
  });

  return {
    time,
    startCountdown,
    resetCountdown,
  };
}
