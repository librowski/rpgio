import { insert } from "./insert";
import { remove } from "./remove";

export function reorder<T>(array: T[], from: number, to: number) {
  const target = array[from];
  const without = remove(array, from);

  return insert(without, target, to);
}
