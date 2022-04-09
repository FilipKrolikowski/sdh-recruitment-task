import styled from "styled-components";
import { Link } from "react-router-dom";
import { StockType } from "../types/stockType";
import { StockPropNames } from "../enums/stockPropNames";

const MainTr = styled.tr`
  color: #fff;
  border: 2px solid #000;
  background: #9e9e9e;
  font-weight: 400;
  font-size: 16px;
`;

const Table = styled.table`
  border: 2px solid #000;
`;

const Th = styled.th`
  border-right: 2px solid #000;
  border-left: 2px solid #000;
`;

const Tr = styled.tr`
  color: #000;
  border: 2px solid #000;
  background: ${({ white }: { white: boolean }) => (white ? "#fff" : "#e6e6e6")};
  font-weight: 400;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
  &:hover {
    color: #636363;
  }
`;

type StockPortfolioProps = {
  stocks: StockType[];
  removeStock(stock: StockType): void;
};

export default function StockPortfolio({ stocks, removeStock }: StockPortfolioProps): JSX.Element {
  return (
    <div>
      <div className="fw-600">Your portfolio</div>
      <div>
        <Table className="w-100 text-center">
          <thead>
            <MainTr>
              <th className="py-3 w-50">Company Name</th>
              <Th className="py-3 w-25">Symbol</Th>
              <th className="py-3 w-25">Actions</th>
            </MainTr>
          </thead>
          <tbody>
            {stocks.length ? (
              stocks.map((stock, index) => (
                <Tr white={index % 2 !== 0} key={`table-stock-${stock[StockPropNames.Symbol]}`}>
                  <th className="py-3 w-50">
                    <StyledLink to={`/company/${stock[StockPropNames.Symbol]}`}>
                      {stock[StockPropNames.Name]}
                    </StyledLink>
                  </th>
                  <Th className="py-3 w-25">
                    <StyledLink to={`/company/${stock[StockPropNames.Symbol]}`}>
                      {stock[StockPropNames.Symbol]}
                    </StyledLink>
                  </Th>
                  <th className="py-3 w-25">
                    <div className="pointer" onClick={() => removeStock(stock)}>
                      Remove
                    </div>
                  </th>
                </Tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
