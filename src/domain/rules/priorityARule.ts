import { type Item, type ColorLimits, type DistributionRule } from '../models';
  import { defaultDistribution } from './defaultRule';
  import { addQuantities, cloneQuantities, withinLimits } from '../utils';
  
  const LIMITS: ColorLimits = { maxGreen: 1000, maxBlue: 1000, maxRed: 1000 };
  
  const expand = (items: Item[]): Item[] =>
    items.filter(item => item.special !== 'SPECIAL').flatMap(item =>
      Array.from({ length: item.amount }, () => ({
        ...item,
        amount: 1,
        colorAmount: cloneQuantities(item.colorAmount)
      }))
    );
  
  const countIds = (items: Item[]): Record<number, number> =>
    items.reduce((accumulator, item) => {
      accumulator[item.id] = (accumulator[item.id] || 0) + 1;
      return accumulator;
    }, {} as Record<number, number>);
  
  export const priorityADistribution: DistributionRule = (items) => {
    const expanded = expand(items);
    let sum = { green: 0, blue: 0, red: 0 };
    const usedIndices: Set<number> = new Set();
    const containerAItems: Item[] = [];
  
    expanded.forEach((item, index) => {
      const candidate = addQuantities(sum, item.colorAmount);
      if (withinLimits(candidate, LIMITS)) {
        sum = candidate;
        containerAItems.push(item);
        usedIndices.add(index);
      }
    });
  
    const leftover = expanded.filter((_, index) => !usedIndices.has(index));
    const rest = defaultDistribution(leftover).slice(1);
  
    return [
      {
        containerId: 'A',
        colorAmount: sum,
        idsItems: countIds(containerAItems)
      },
      ...rest.map((container, index) => ({ ...container, containerId: `${index + 2}` }))
    ];
  };
