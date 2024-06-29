import { randomInteger } from "./random-integer";

export function randomFloat(min: number, max: number, decimals = 2) {
  return randomInteger(min * decimals, max * decimals) / decimals;
}
