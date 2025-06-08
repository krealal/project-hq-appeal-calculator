import { describe, it, expect } from 'vitest';
import { defaultDistribution } from './defaultRule';
import type { Item } from '../models';

describe('defaultDistribution', () => {
  const createItem = (
    id: number, 
    quantities: { green: number; blue: number; red: number }, 
    cantidad: number = 1,
    special?: string
  ): Item => ({
    id,
    colorAmount: quantities,
    amount: cantidad,
    special: special
  });

  it('should return 7 empty containers when no items are provided', () => {
    const result = defaultDistribution([]);
    
    expect(result).toHaveLength(7);
    result.forEach((container, index) => {
      expect(container.containerId).toBe(`${index + 1}`);
      expect(container.colorAmount).toEqual({ green: 0, blue: 0, red: 0 });
      expect(container.idsItems).toEqual({});
    });
  });

  it('should filter out SPECIAL items', () => {
    const items = [
      createItem(1, { green: 100, blue: 50, red: 25 }, 1),
      createItem(2, { green: 200, blue: 100, red: 50 }, 1, 'SPECIAL')
    ];
    
    const result = defaultDistribution(items);
    
    expect(result[0].colorAmount.green).toBe(100);
    expect(result[0].colorAmount.blue).toBe(8); // 7 + 1
    expect(result[0].colorAmount.red).toBe(4);  // 3 + 1
    
    expect(result[1].colorAmount.green).toBe(0);
    expect(result[1].colorAmount.blue).toBe(7);
    expect(result[1].colorAmount.red).toBe(4);  // 3 + 1
    
    expect(result[2].colorAmount.green).toBe(0);
    expect(result[2].colorAmount.blue).toBe(7);
    expect(result[2].colorAmount.red).toBe(4);  // 3 + 1
    
    expect(result[3].colorAmount.green).toBe(0);
    expect(result[3].colorAmount.blue).toBe(7);
    expect(result[3].colorAmount.red).toBe(4);  // 3 + 1
  });

  it('should expand items with amount > 1', () => {
    const items = [
      createItem(1, { green: 100, blue: 50, red: 25 }, 3)
    ];
    
    const result = defaultDistribution(items);

    expect(result[0].colorAmount.green).toBe(300);
    expect(result[0].colorAmount.blue).toBe(22); // 21 + 1
    expect(result[0].colorAmount.red).toBe(11);  // 10 + 1
    
    expect(result[1].colorAmount.blue).toBe(22); // 21 + 1
    expect(result[1].colorAmount.red).toBe(11);  // 10 + 1
    
    expect(result[2].colorAmount.blue).toBe(22); // 21 + 1
    expect(result[2].colorAmount.red).toBe(11);  // 10 + 1
    
    expect(result[3].colorAmount.blue).toBe(21);
    expect(result[3].colorAmount.red).toBe(11);  // 10 + 1
    
    expect(result[4].colorAmount.blue).toBe(21);
    expect(result[4].colorAmount.red).toBe(11);  // 10 + 1
    
    expect(result[5].colorAmount.blue).toBe(21);
    expect(result[5].colorAmount.red).toBe(10);
    
    expect(result[6].colorAmount.blue).toBe(21);
    expect(result[6].colorAmount.red).toBe(10);
  });

  it('should distribute green appeal across containers when exceeding APPEAL_LIMIT', () => {
    const items = [
      createItem(1, { green: 2500, blue: 14, red: 14 }, 1)
    ];
    
    const result = defaultDistribution(items);
    
    expect(result[0].colorAmount.green).toBe(1000);
    expect(result[1].colorAmount.green).toBe(1000);
    expect(result[2].colorAmount.green).toBe(500);
    
    // Remaining containers should have 0 green
    for (let i = 3; i < 7; i++) {
      expect(result[i].colorAmount.green).toBe(0);
    }
  });

  it('should distribute blue and red evenly across 7 containers', () => {
    const items = [
      createItem(1, { green: 500, blue: 21, red: 28 }, 1)
    ];
    
    const result = defaultDistribution(items);
    
    result.forEach(container => {
      expect(container.colorAmount.blue).toBe(3);
      expect(container.colorAmount.red).toBe(4);
    });
  });
}); 