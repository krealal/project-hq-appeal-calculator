export interface Item {
    readonly id: number;
    readonly colorAmount: ColorAmount;
    readonly amount: number;
    readonly special?: string;
  }
  
  export interface ColorAmount {
    readonly green: number;
    readonly blue: number;
    readonly red: number;
  }
  
  export interface ColorLimits {
    readonly maxGreen: number;
    readonly maxBlue: number;
    readonly maxRed: number;
  }
  
  export interface ContainerResult {
    readonly containerId: string;
    readonly colorAmount: ColorAmount;
    readonly idsItems: Record<number, number>;
  }
  
  export type DistributionRule = (items: Item[]) => ContainerResult[];
  