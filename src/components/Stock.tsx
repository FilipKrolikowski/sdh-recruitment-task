import styled from "styled-components";
import { StockType } from "../types/stockType";
import { StockPropNames } from "../enums/stockPropNames";
const AddIcon: string = require("../images/icons/add-icon.svg").default;

type StockProps = {
  stock: StockType;
  addStock(stock: StockType): void;
};

const Img = styled.img`
  width: 20px;
`;

export default function Stock({ stock, addStock }: StockProps): JSX.Element {
  return (
    <div className="d-flex fw-600 my-2">
      <div>{stock[StockPropNames.Symbol]} - </div>
      <div className="mx-1">{stock[StockPropNames.Name]}</div>
      <div className="ms-auto pointer" onClick={() => addStock(stock)}>
        <Img src={AddIcon} alt="add" />
      </div>
    </div>
  );
}
