export function changeInTime({ time, startValue, endValue, update }: Options) {
  const iterations = Math.floor((time * 1000) / TIME_STEP);

  if (iterations === 0) {
    update(endValue);
    return;
  }

  const delta = (endValue - startValue) / iterations;

  let currentValue = startValue;

  const handle = setInterval(() => {
    currentValue += delta;
    update(currentValue);

    if (currentValue >= endValue) {
      clearInterval(handle);
    }
  }, TIME_STEP);

  return handle;
}

type Options = {
  time: number;
  startValue: number;
  endValue: number;
  update: (value: number) => void;
};

const TIME_STEP = 10;
