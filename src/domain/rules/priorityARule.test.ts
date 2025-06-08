import { describe, it, expect } from 'vitest';
import { priorityADistribution } from './priorityARule';
import type { Item } from '../models';

describe('priorityADistribution', () => {
  const createItem = (
    id: number, 
    colorAmount: { green: number; blue: number; red: number }, 
    amount: number = 1,
    special?: string
  ): Item => ({
    id,
    colorAmount,
    amount,
    special
  });

  it('should return container A plus 6 other containers when no items are provided', () => {
    const result = priorityADistribution([]);
    
    expect(result).toHaveLength(7);
    expect(result[0].containerId).toBe('A');
    expect(result[0].colorAmount).toEqual({ green: 0, blue: 0, red: 0 });
    expect(result[0].idsItems).toEqual({});
    
    // Other containers should have IDs 2-7
    for (let i = 1; i < 7; i++) {
      expect(result[i].containerId).toBe(`${i + 1}`);
      expect(result[i].colorAmount).toEqual({ green: 0, blue: 0, red: 0 });
      expect(result[i].idsItems).toEqual({});
    }
  });

  it('should filter out SPECIAL items', () => {
    const items = [
      createItem(1, { green: 500, blue: 300, red: 200 }, 1),
      createItem(2, { green: 200, blue: 100, red: 50 }, 1, 'SPECIAL')
    ];
    
    const result = priorityADistribution(items);
    
    expect(result[0].containerId).toBe('A');
    expect(result[0].colorAmount).toEqual({ green: 500, blue: 300, red: 200 });
    expect(result[0].idsItems).toEqual({ 1: 1 });
  });

  it('should expand items with amount 3', () => {
    const items = [
      createItem(1, { green: 200, blue: 150, red: 100 }, 3)
    ];
    
    const result = priorityADistribution(items);
    
    expect(result[0].containerId).toBe('A');
    expect(result[0].colorAmount).toEqual({ green: 600, blue: 450, red: 300 });
    expect(result[0].idsItems).toEqual({ 1: 3 });
  });

  it('should reject items that would exceed container A limits', () => {
    const items = [
      createItem(1, { green: 800, blue: 500, red: 300 }, 1),
      createItem(2, { green: 300, blue: 600, red: 800 }, 1)
    ];
    
    const result = priorityADistribution(items);
    
    expect(result[0].containerId).toBe('A');
    expect(result[0].colorAmount).toEqual({ green: 800, blue: 500, red: 300 });
    expect(result[0].idsItems).toEqual({ 1: 1 });
   
    expect(result[1].containerId).toBe('2');
    expect(result[1].colorAmount.green).toBe(0);
    expect(result[1].colorAmount.blue).toBe(86);
    expect(result[1].colorAmount.red).toBe(115);
  });

  it('should handle exact limit values', () => {
    const items = [
      createItem(1, { green: 1000, blue: 1000, red: 1000 }, 1),
      createItem(2, { green: 1, blue: 1, red: 1 }, 1)
    ];
    
    const result = priorityADistribution(items);
    
    expect(result[0].colorAmount).toEqual({ green: 1000, blue: 1000, red: 1000 });
    expect(result[0].idsItems).toEqual({ 1: 1 });
    
    expect(result[1].colorAmount.green).toBe(0);
    expect(result[1].colorAmount.blue).toBe(0);
    expect(result[1].colorAmount.red).toBe(0);
  });

  it('should handle partial fitting with greedy selection', () => {
    const items = [
      createItem(1, { green: 600, blue: 400, red: 200 }, 1),
      createItem(2, { green: 300, blue: 500, red: 700 }, 1),
      createItem(3, { green: 100, blue: 100, red: 100 }, 1),
      createItem(4, { green: 200, blue: 200, red: 200 }, 1)
    ];
    
    const result = priorityADistribution(items);

    expect(result[0].colorAmount).toEqual({ green: 1000, blue: 1000, red: 1000 });
    expect(result[0].idsItems).toEqual({ 1: 1, 2: 1, 3: 1 });
    
    // Item 4 should be in containers 2-7 via default distribution
    expect(result[1].colorAmount.green).toBe(0);
  });

  it('should handle edge case where no items fit in container A', () => {
    const items = [
      createItem(1, { green: 1001, blue: 500, red: 500 }, 1),
      createItem(2, { green: 500, blue: 1001, red: 500 }, 1),
      createItem(3, { green: 500, blue: 500, red: 1001 }, 1)
    ];
    
    const result = priorityADistribution(items);
    
    expect(result[0].colorAmount).toEqual({ green: 0, blue: 0, red: 0 });
    expect(result[0].idsItems).toEqual({});
  });
}); 