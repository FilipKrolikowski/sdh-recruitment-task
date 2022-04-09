import { StockPropNames } from "../enums/stockPropNames";
export type StockType = {
  [StockPropNames.Symbol]: string;
  [StockPropNames.Name]: string;
};
