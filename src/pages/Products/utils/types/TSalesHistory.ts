import {TFurniture} from "./TFurniture";

export type TSalesHistory = {
  _id: string;
  buyerName: string;
  quantity: number;
  dateOfSale: string;
  furnitureData: TFurniture;
  createdAt: string;
  updatedAt: string;
};
