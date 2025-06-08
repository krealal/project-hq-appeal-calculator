import type { ColorAmount, ColorLimits } from './models';

export const addQuantities = (a: ColorAmount, b: ColorAmount): ColorAmount => ({
  green: a.green + b.green,
  blue:  a.blue  + b.blue,
  red:  a.red  + b.red,
});

export const cloneQuantities = (q: ColorAmount): ColorAmount => ({ ...q });

export const withinLimits = (q: ColorAmount, limits: ColorLimits): boolean =>
  q.green <= limits.maxGreen &&
  q.blue   <= limits.maxBlue &&
  q.red   <= limits.maxRed;
