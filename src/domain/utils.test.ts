import { describe, it, expect } from 'vitest';
import { addQuantities, cloneQuantities, withinLimits } from './utils';
import type { ColorAmount, ColorLimits } from './models';

describe('utils', () => {
  describe('addQuantities', () => {
    it('should add two ColorQuantities objects correctly', () => {
      const a: ColorAmount = { green: 10, blue: 20, red: 30 };
      const b: ColorAmount = { green: 5, blue: 15, red: 25 };
      
      const result = addQuantities(a, b);
      
      expect(result).toEqual({ green: 15, blue: 35, red: 55 });
    });

    it('should handle zero values', () => {
      const a: ColorAmount = { green: 10, blue: 20, red: 30 };
      const b: ColorAmount = { green: 0, blue: 0, red: 0 };
      
      const result = addQuantities(a, b);
      
      expect(result).toEqual({ green: 10, blue: 20, red: 30 });
    });

    it('should handle negative values', () => {
      const a: ColorAmount = { green: 10, blue: 20, red: 30 };
      const b: ColorAmount = { green: -5, blue: -10, red: -15 };
      
      const result = addQuantities(a, b);
      
      expect(result).toEqual({ green: 5, blue: 10, red: 15 });
    });
  });

  describe('cloneQuantities', () => {
    it('should create a deep copy of ColorQuantities', () => {
      const original: ColorAmount = { green: 10, blue: 20, red: 30 };
      
      const cloned = cloneQuantities(original);
      
      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original); // Different reference
    });

    it('should handle zero values', () => {
      const original: ColorAmount = { green: 0, blue: 0, red: 0 };
      
      const cloned = cloneQuantities(original);
      
      expect(cloned).toEqual({ green: 0, blue: 0, red: 0 });
      expect(cloned).not.toBe(original);
    });
  });

  describe('withinLimits', () => {
    const limits: ColorLimits = {
      maxGreen: 100,
      maxBlue: 200,
      maxRed: 150
    };

    it('should return true when all quantities are within limits', () => {
      const quantities: ColorAmount = { green: 50, blue: 100, red: 75 };
      
      const result = withinLimits(quantities, limits);
      
      expect(result).toBe(true);
    });

    it('should return true when quantities are exactly at limits', () => {
      const quantities: ColorAmount = { green: 100, blue: 200, red: 150 };
      
      const result = withinLimits(quantities, limits);
      
      expect(result).toBe(true);
    });

    it('should return false when green exceeds limit', () => {
      const quantities: ColorAmount = { green: 101, blue: 100, red: 75 };
      
      const result = withinLimits(quantities, limits);
      
      expect(result).toBe(false);
    });

    it('should return false when blue exceeds limit', () => {
      const quantities: ColorAmount = { green: 50, blue: 201, red: 75 };
      
      const result = withinLimits(quantities, limits);
      
      expect(result).toBe(false);
    });

    it('should return false when red exceeds limit', () => {
      const quantities: ColorAmount = { green: 50, blue: 100, red: 151 };
      
      const result = withinLimits(quantities, limits);
      
      expect(result).toBe(false);
    });

    it('should return false when multiple colors exceed limits', () => {
      const quantities: ColorAmount = { green: 101, blue: 201, red: 151 };
      
      const result = withinLimits(quantities, limits);
      
      expect(result).toBe(false);
    });

    it('should handle zero quantities and limits', () => {
      const zeroLimits: ColorLimits = { maxGreen: 0, maxBlue: 0, maxRed: 0 };
      const zeroQuantities: ColorAmount = { green: 0, blue: 0, red: 0 };
      
      const result = withinLimits(zeroQuantities, zeroLimits);
      
      expect(result).toBe(true);
    });
  });
}); 