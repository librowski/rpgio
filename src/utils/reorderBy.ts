import { reorder } from "./reorder";

export function reorderBy<
  K1 extends keyof T,
  K2 extends keyof T,
  T extends object,
>(array: T[], from: ReorderBy<T, K1>, to: ReorderBy<T, K2>): T[] {
  const fromIndex = array.findIndex((item) => item[from.name] === from.value);
  const toIndex = array.findIndex((item) => item[to.name] === to.value);

  return reorder(array, fromIndex, toIndex);
}

type ReorderBy<T extends object, K extends keyof T> = {
  name: K;
  value: T[K];
};
