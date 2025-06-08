export interface Item {
    readonly id: number;
    readonly quantities: ColorQuantities;
    readonly cantidad: number;
    readonly especial?: string;
  }
  
  export interface ColorQuantities {
    readonly verde: number;
    readonly azul: number;
    readonly rojo: number;
  }
  
  export interface ColorLimits {
    readonly maxVerde: number;
    readonly maxAzul: number;
    readonly maxRojo: number;
  }
  
  export interface ContainerResult {
    readonly containerId: string;
    readonly quantities: ColorQuantities;
    readonly idsItems: Record<number, number>;
  }
  
  export type DistributionRule = (items: Item[]) => ContainerResult[];
  