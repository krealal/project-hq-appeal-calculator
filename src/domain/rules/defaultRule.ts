import type { Item, DistributionRule } from '../models';
import { addQuantities, cloneQuantities } from '../utils';

const CONTAINER_CITIES = 7;
const APPEAL_LIMIT = 1000;

const expand = (items: Item[]): Item[] =>
  items.filter(item => item.especial !== 'ESPECIAL').flatMap(item =>
    Array.from({ length: item.cantidad }, () => ({
      ...item,
      cantidad: 1,
      quantities: cloneQuantities(item.quantities)
    }))
  );

export const defaultDistribution: DistributionRule = (items) => {
  const expanded = expand(items);
  const totals = expanded.reduce(
    (accumulator, item) => addQuantities(accumulator, item.quantities),
    { green: 0, blue: 0, red: 0 }
  );

  const fullGreen = Math.floor(totals.green / APPEAL_LIMIT);
  const remainingGreen = totals.green % APPEAL_LIMIT;
  const bluePerContainer = Math.floor(totals.blue / CONTAINER_CITIES);
  const redPerContainer = Math.floor(totals.red / CONTAINER_CITIES);
  const remainingBlue = totals.blue % CONTAINER_CITIES;
  const remainingRed = totals.red % CONTAINER_CITIES;

  return Array.from({ length: CONTAINER_CITIES }, (_, containerIndex) => {
    const green = containerIndex < fullGreen ? APPEAL_LIMIT : containerIndex === fullGreen ? remainingGreen : 0;
    const blue = bluePerContainer + (containerIndex < remainingBlue ? 1 : 0);
    const red = redPerContainer + (containerIndex < remainingRed ? 1 : 0);

    return {
      containerId: `${containerIndex + 1}`,
      quantities: { green, blue, red },
      idsItems: {}
    };
  });
};
