import { useSearchStock } from "../utils/useSearchStock";
import { useState, useCallback } from "react";
import { debounce, isEmpty } from "lodash";
import Stock from "./Stock";
import StockPortfolio from "./StockPortfolio";
import styled from "styled-components";
import { parseHttpError } from "../utils/parseHttpError";
import { HttpErrorAlert } from "./HttpErrorAlert";
import { StockType } from "../types/stockType";
import { StockPropNames } from "../enums/stockPropNames";

const Input = styled.input`
  padding: 5px;
  color: #000;
  border: 2px solid #000;
  border-radius: 20px;
`;

const Label = styled.label`
  color: #000;
  font-size: 16px;
  font-weight: 600;
`;

const SearchResultDiv = styled.div`
  padding: 5px 10px;
  border: 2px solid #000;
`;

export default function SearchStocks(): JSX.Element {
  const [searchInput, setSearchInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { stocks, loading, error } = useSearchStock(query);
  const [chosenStocks, setChosenStocks] = useState<StockType[]>(
    JSON.parse(localStorage.getItem("sdh-stocks") || "") || []
  );

  const debouncedFunction = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 600),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFunction(e.target.value);
  };

  const handleAddStock = (stock: StockType) => {
    if (
      !chosenStocks.find(
        (chosenStock: StockType) => chosenStock[StockPropNames.Symbol] === stock[StockPropNames.Symbol]
      )
    ) {
      const newStocksArray = [...chosenStocks, stock];
      setChosenStocks(newStocksArray);
      localStorage.setItem("sdh-stocks", JSON.stringify(newStocksArray));
    }
  };

  const handleRemoveStock = (stock: StockType) => {
    const newStocksArray = chosenStocks.filter(
      (chosenStock) => chosenStock[StockPropNames.Symbol] !== stock[StockPropNames.Symbol]
    );
    setChosenStocks(newStocksArray);
    localStorage.setItem("sdh-stocks", JSON.stringify(newStocksArray));
  };

  return (
    <div className="row mx-auto mt-4 px-2 px-lg-0">
      <div className="col-12 col-lg-6 pe-0 pe-lg-5 px-0 px-lg-3">
        <div>
          <Label className="w-100" htmlFor="search-stock">
            Company Name
          </Label>
          <Input
            id="search-stock"
            type="text"
            className="w-75"
            value={searchInput}
            placeholder="Example: Apple"
            onChange={(e) => {
              handleSearch(e);
              setSearchInput(e.target.value);
            }}
          />
          <div className="mt-5 fw-600">Search Results</div>
          {stocks?.length ? (
            <div className="mt-1">
              <SearchResultDiv>
                {stocks.map((stock) => (
                  <Stock key={stock[StockPropNames.Symbol]} stock={stock} addStock={handleAddStock} />
                ))}
              </SearchResultDiv>
            </div>
          ) : (
            <div className="mt-5"> {loading ? <div>Loading...</div> : <div>Search to see results</div>}</div>
          )}
          {!isEmpty(error) && <HttpErrorAlert error={parseHttpError(error)} />}
        </div>
      </div>
      <div className="col-12 col-lg-6 ps-0 ps-lg-5 mt-5 mt-lg-0 px-0 px-lg-3">
        <div>
          <StockPortfolio stocks={chosenStocks} removeStock={handleRemoveStock} />
        </div>
      </div>
    </div>
  );
}
