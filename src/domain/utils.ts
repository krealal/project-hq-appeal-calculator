import type { ColorQuantities, ColorLimits } from './models';

export const addQuantities = (a: ColorQuantities, b: ColorQuantities): ColorQuantities => ({
  green: a.green + b.green,
  blue:  a.blue  + b.blue,
  red:  a.red  + b.red,
});

export const cloneQuantities = (q: ColorQuantities): ColorQuantities => ({ ...q });

export const withinLimits = (q: ColorQuantities, limits: ColorLimits): boolean =>
  q.green <= limits.maxGreen &&
  q.blue   <= limits.maxBlue &&
  q.red   <= limits.maxRed;
