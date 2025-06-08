export interface Item {
    readonly id: number;
    readonly quantities: ColorQuantities;
    readonly cantidad: number;
    readonly especial?: string;
  }
  
  export interface ColorQuantities {
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
    readonly quantities: ColorQuantities;
    readonly idsItems: Record<number, number>;
  }
  
  export type DistributionRule = (items: Item[]) => ContainerResult[];
  